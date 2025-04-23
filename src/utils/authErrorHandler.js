const errorMessages = {
    network: "Service unavailable. Please try again later.",
    default: "Login failed. Please check your credentials and retry.",
    specific: {
        "user": "Login failed. Please check your username and retry.",
        "password": "Login failed. Please check your password and retry.",
    }
};

export const getUserAuthError = (error) => {

    if (error.status === 'NETWORK_ERROR') return errorMessages.network;

    const backendMessage = error.data?.message?.toLowerCase() || '';
    const status = error.status;

    if (status === 400 || status === 401) {
        if (backendMessage.includes("user")) return errorMessages.specific.user;
        if (backendMessage.includes("password")) return errorMessages.specific.password;
    }

return errorMessages.default;
};