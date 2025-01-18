import { useState, useEffect } from 'react';

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
            alert('Please install MetaMask to use this feature');
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
            console.error('Error connecting wallet:', error);
        }
    };

    return {
        isConnected,
        isPremium,
        walletAddress,
        connectWallet
    };
} 