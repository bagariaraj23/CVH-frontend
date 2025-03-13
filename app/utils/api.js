// utils/api.js
export const checkRoleWithEmail = async (email) => {
    try {
        const response = await fetch("/api/user/emailAuth/role", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) {
            throw new Error("Failed to check user role");
        }

        const data = await response.json();
        return {
            role: data.role,
            status: data.status
        };
    } catch (error) {
        console.error("Error checking user role:", error);
        throw error;
    }
}

export const checkUserRole = async (walletAddress) => {
    try {
        const response = await fetch("/api/user/role", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress }),
        });

        if (!response.ok) {
            throw new Error("Failed to check user role");
        }

        const data = await response.json();
        return {
            role: data.role,
            status: data.status
        };
    } catch (error) {
        console.error("Error checking user role:", error);
        throw error;
    }
};

export const submitVerificationRequestEmail = async (data) => {
    const response = await fetch("/api/verification/submit/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("API request failed");
    }

    const result = await response.json();
    return result;
}

export const submitVerificationRequest = async (data) => {
    const response = await fetch("/api/verification/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("API request failed");
    }

    const result = await response.json();
    return result;
};

export const updateVerificationStatus = async (id, status) => {
    await fetch(`/api/verification/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
};

export const fetchVerificationRequests = async () => {
    const response = await fetch("/api/verification/requests", {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch verification requests.");
    }
    return response.json();
};

export const checkVerificationStatusEmail = async (email) => {
    console.log(email);
    try {
        const response = await fetch("/api/verification/requests/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        console.log(response);

        if (response.status === 404) {
            return { status: "not-found", message: "No verification request found." };
        }

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in checkVerificationStatus:", error);
        throw new Error("Failed to check verification status.");
    }
}

export const checkVerificationStatus = async (walletAddress) => {
    try {
        const response = await fetch("/api/verification/requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ walletAddress }),
        });

        if (response.status === 404) {
            return { status: "not-found", message: "No verification request found." };
        }

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in checkVerificationStatus:", error);
        throw new Error("Failed to check verification status.");
    }
};
