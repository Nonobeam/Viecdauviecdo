import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const API_URL = "https://backend.matchlent.xyz/api/users/activate";

const Activate = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const activateAccount = async () => {
            const token = searchParams.get("cri");

            if (!token) {
                setStatus("error");
                setMessage("Invalid activation link. No token provided.");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/${token}`, {
                    method: "GET",
                    headers: {
                        "accept": "*/*",
                    },
                });

                if (response.ok) {
                    setStatus("success");
                    setMessage("Your account has been successfully activated!");
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000);
                } else if (response.status === 404) {
                    setStatus("error");
                    setMessage("You are not authorized to access this page, please return to Registration");
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000);
                } else {
                    const data = await response.json();
                    setStatus("error");
                    setMessage(data.message || "Failed to activate account. Please try again.");
                }
            } catch (error) {
                setStatus("error");
                setMessage("Network error. Please check your connection and try again.");
            }
        };

        activateAccount();
    }, [searchParams, navigate]);

    const getStatusIcon = () => {
        switch (status) {
            case "loading":
                return <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />;
            case "success":
                return <CheckCircle className="w-16 h-16 text-green-500" />;
            case "error":
                return <XCircle className="w-16 h-16 text-red-500" />;
            default:
                return null;
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case "loading":
                return "text-blue-600";
            case "success":
                return "text-green-600";
            case "error":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-6">{getStatusIcon()}</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Account Activation</h2>
                    <div className={`text-lg ${getStatusColor()}`}>
                        {status === "loading" && "Activating your account..."}
                        {status === "success" && "Activation Successful!"}
                        {status === "error" && "Activation Failed"}
                    </div>
                    <p className="mt-4 text-gray-600">{message}</p>
                    {status === "success" && (
                        <p className="mt-2 text-sm text-gray-500">Redirecting to login page in 3 seconds...</p>
                    )}
                    {status === "error" && (
                        <div className="mt-6 space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                disabled={status === "loading"}
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Go to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Activate;