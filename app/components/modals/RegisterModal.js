"use client";

import axios from "axios";
import { FaWallet } from "react-icons/fa";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Input from "../input";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            role: "DOCTOR",
            name: "",
            password: "",
            specialization: "",
            licenseNumber: "",
            address: "",
            registrationId: "",
            details: "",
        },
    });

    const role = watch("role");

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const result = await response.json();
            toast.success(result.message);
            registerModal.onClose();
            loginModal.onOpen();
        } catch (error) {
            toast.error(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);

    const renderRoleSpecificFields = () => {
        switch (role) {
            case "DOCTOR":
                return (
                    <>
                        <Input id="name" label="Full Name" disabled={isLoading} register={register} errors={errors} required />
                        <Input id="specialization" label="Specialization" disabled={isLoading} register={register} errors={errors} required />
                        <Input id="licenseNumber" label="License Number" disabled={isLoading} register={register} errors={errors} required />
                    </>
                );
            case "HOSPITAL":
                return (
                    <>
                        <Input id="name" label="Hospital Name" disabled={isLoading} register={register} errors={errors} required />
                        <Input id="address" label="Hospital Address" disabled={isLoading} register={register} errors={errors} required />
                        <Input id="registrationId" label="Registration ID" disabled={isLoading} register={register} errors={errors} required />
                    </>
                );
            case "PATIENT":
                return (
                    <Input id="name" label="Full Name" disabled={isLoading} register={register} errors={errors} required />
                );
            default:
                return null;
        }
    };

    const bodyContent = (
        <div className="flex text-black flex-col gap-4">
            <div className={'text-center'}>
                <div className="text-2xl text-black font-bold">
                    Welcome to CVH!
                </div>
                <div className="font-light text-black mt-2">
                    Create an Account!
                </div>
            </div>
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
            <select
                id="role"
                {...register("role")}
                className="mt-1 p-2 w-full rounded border"
                disabled={isLoading}
            >
                <option value="DOCTOR">Doctor</option>
                <option value="HOSPITAL">Hospital</option>
                <option value="PATIENT">Patient</option>
            </select>
            {renderRoleSpecificFields()}
            <textarea
                id="details"
                {...register("details")}
                placeholder="Additional Details"
                className="mt-1 p-2 w-full rounded border"
                rows="4"
                disabled={isLoading}
            ></textarea>
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            {/* <Button outline label="Continue with Metamask" icon={FaWallet} onClick={() => signIn("google")} /> */}
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>Already have an Account?</div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
                        Login
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
