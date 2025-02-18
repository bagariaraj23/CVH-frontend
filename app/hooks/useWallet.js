import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function useWallet() {
    const [isConnected, setIsConnected] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);

    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    setIsConnected(true);
                    await checkPremiumStatus(accounts[0]);
                }
            } catch (error) {
                toast.error('Error checking wallet connection: ' + error.message, {
                    position: 'top-right',
                    autoClose: 5000
                });
                console.error('Error checking wallet connection:', error);
            }
        }
    };

    const checkPremiumStatus = async (address) => {
        try {
            const response = await fetch('/api/subscription/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress: address })
            });
            const data = await response.json();
            setIsPremium(data.isPremium);
        } catch (error) {
            toast.error('Error checking premium status: ' + error.message, {
                position: 'top-right',
                autoClose: 5000
            });
            console.error('Error checking premium status:', error);
        }
    };

    const connectWallet = async () => {
        if (!(typeof window !== 'undefined' && window.ethereum)) {
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
            // Request user to connect a wallet
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            const address = accounts[0];
            setWalletAddress(address);
            setIsConnected(true);
            await checkPremiumStatus(address);
        } catch (error) {
            toast.error('Error connecting wallet: ' + error.message, {
                position: 'top-right',
                autoClose: 5000
            });
        }
    };

    return {
        isConnected,
        isPremium,
        walletAddress,
        connectWallet
    };
} 