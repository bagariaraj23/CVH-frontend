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
            console.error('Error checking premium status:', error);
        }
    };

    const connectWallet = async () => {
        if (!window.ethereum) {
            toast.error('Please install MetaMask to use this feature', {
                position: "top-right",
                autoClose: 5000
            });
            return;
        }

        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            setWalletAddress(accounts[0]);
            setIsConnected(true);
            await checkPremiumStatus(accounts[0]);
        } catch (error) {
            toast.error('Error connecting wallet: ' + error.message, {
                position: "top-right",
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