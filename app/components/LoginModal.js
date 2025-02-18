"use client";

import { signIn } from "next-auth/react";
import axios from "axios";
import { FaWallet } from "react-icons/fa";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./modals/Modal";
import Input from "./input";
import { toast } from "react-hot-toast";
import Button from "./Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation"; 
import { checkUserRole } from "../utils/api";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null); 
    const [userRole, setUserRole] = useState(null);    // e.g. "doctor", "patient", etc.
    const [userStatus, setUserStatus] = useState(null); // e.g. "pending", "verified", "not_verified"

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success("Login Successful");
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback?.error);
            }
        });
    };

    const handleDisconnect = () => {
        setWalletAddress(null);
        setIsConnected(false);
        router.push('/');
        toast.info("Wallet disconnected. Please manually remove the wallet connection from your metamask extension in the browser.", {
            position: "top-right",
            autoClose: 5000
        });
    };

    const toggleWalletConnection = async () => {
        if (isConnected) {
            handleDisconnect();
        } else {
            await connectWallet();
            loginModal.onClose();
        }
    };

    const connectWallet = async () => {
        if (!window.ethereum) {
            toast.error(
                <div>
                    MetaMask is not installed. To proceed,{' '}
                    <span
                        style={{
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            color: '#007bff',
                            cursor: 'pointer'
                        }}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click from closing the toast
                            window.open('https://metamask.io/download.html', '_blank');
                        }}
                    >
                        Click here
                    </span>{' '}
                    to install MetaMask.
                </div>,
                {
                    position: 'top-right',
                    autoClose: 7000, // Give the user more time to read
                    closeOnClick: false, // Prevent accidental dismissal
                    draggable: true
                }
            );

            return;
        }

        try {
            setLoading(true);
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const address = accounts[0];
            setWalletAddress(address);
            setIsConnected(true);
            await handleRoleCheck(address);
        } catch (err) {
            if (err.code === 4001) {
                toast.error("Connection request denied by user.", {
                    position: "top-right",
                    autoClose: 5000
                });
            } else {
                toast.error("Failed to connect wallet. Please try again.", {
                    position: "top-right",
                    autoClose: 5000
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRoleCheck = async (address) => {
        try {
            const response = await checkUserRole(address.toLowerCase());
            const { role, status } = response;
            setUserRole(role);
            setUserStatus(status);

            // First check if it's admin
            if (address === "0x4d5b0Ac9C4148932bd10a28B1E0a064f51f390D4".toLowerCase()) {
                router.push("/admin");
                return;
            }

            // Handle different status cases
            switch (status) {
                case "verified":
                    // Instead of forcibly routing them, we let them remain on the page
                    // Then they can click a link "Go to your dashboard" if they want
                    toast.success(`You are verified as ${role}. You can access your dashboard from the menu.`, {
                        position: "top-right",
                        autoClose: 5000
                    });
                    break;

                case "pending":
                    router.push("/user/under-review");
                    break;

                case "not_verified":
                    switch (role.toLowerCase()) {
                        case "none":
                            toast.warning("The user has been marked as not verified. Please fill the verification Form again!", {
                                position: "top-right",
                                autoClose: 5000
                            });
                    }
                    router.push("/user/verification");
                    break;
                case "new":
                default:
                    router.push("/user/verification");
                    break;
            }
        } catch (err) {
            console.error("Error in handleRoleCheck:", err);
            setError("Unable to check user role. Try again later.");
        }
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <div className={'text-center'}>
                <div className="text-2xl text-black font-bold">
                    Welcome Again!
                </div>
                <div className="font-light text-black mt-2">
                    Login to your Account!
                </div>
            </div>
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Connect Metamask Wallet"
                icon={FaWallet}
                onClick={toggleWalletConnection}
            />
            
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
