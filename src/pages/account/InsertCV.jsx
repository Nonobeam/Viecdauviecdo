import React from "react";
import { Link } from "react-router-dom";
import { FileUpload } from "@/components/ui/file-upload";

const InsertCV = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-6">
                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    <Link to="/profile" className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 12H5m7-7l-7 7 7 7"
                            />
                        </svg>
                        Go to Profile
                    </Link>
                </button>
                <h1 className="text-2xl font-bold mb-6">Insert CV</h1>
            </div>
            <FileUpload />
        </div>
    );
};

export default InsertCV;