'use client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId = null;

export const CustomToastContainer = () => (
    <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={1}
        enableMultiContainer={false}
        containerId="main-toast"
    />
);

export const showError = (error, type = 'error') => {
    // If there's an existing toast, dismiss it first
    if (toastId) {
        toast.dismiss(toastId);
    }

    const errorMessages = {
        // Microphone related errors
        NotAllowedError: {
            title: 'Microphone Access Denied',
            message: 'To enable microphone access:',
            steps: [
                'Click the camera/microphone icon in your browser\'s address bar',
                'Select "Allow" for microphone access',
                'Refresh the page'
            ]
        },
        NotFoundError: {
            title: 'Microphone Not Found',
            message: 'Troubleshooting steps:',
            steps: [
                'Check if your microphone is properly connected',
                'Try unplugging and reconnecting your microphone',
                'Make sure no other application is using the microphone',
                'Check your system sound settings'
            ]
        },
        // Network related errors
        NetworkError: {
            title: 'Network Error',
            message: 'Please check your internet connection and try again.',
        },
        // API related errors
        ApiError: {
            title: 'Service Error',
            message: 'Our service is temporarily unavailable. Please try again later.',
        },
        // Default error
        default: {
            title: 'Error',
            message: 'An unexpected error occurred. Please try again.',
        },
        PremiumRequired: {
            title: 'Premium Feature',
            message: 'This feature requires a premium subscription.',
            steps: [
                'Upgrade to a premium account to access voice features',
                'Contact support if you believe this is an error'
            ]
        },
    };

    const errorType = error.name in errorMessages ? error.name : 'default';
    const errorInfo = errorMessages[errorType];

    // Store the new toast ID
    toastId = toast.error(
        <div className="space-y-2">
            <h3 className="font-bold text-red-700">{errorInfo.title}</h3>
            <p className="text-gray-700">{errorInfo.message}</p>
            {errorInfo.steps && (
                <ul className="list-decimal list-inside space-y-1 text-sm text-gray-600 pl-2">
                    {errorInfo.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>
            )}
        </div>,
        {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'error-toast',
            style: { maxWidth: '400px' },
            toastId: 'main-error-toast', // Unique ID for the toast
            containerId: "main-toast",
            onClose: () => {
                toastId = null; // Reset the toast ID when closed
            }
        }
    );

    return toastId;
}; 