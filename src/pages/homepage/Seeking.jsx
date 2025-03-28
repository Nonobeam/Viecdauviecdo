import { Briefcase, FileText } from "lucide-react"
import { ROUTES } from "@/config"
import { useNavigate } from "react-router-dom"

const Seeking = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-`back`ground">
            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Job Posting Card */}
                    <button 
                        className="hover:bg-secondary transition duration-200 ease-in-out rounded-lg p-6 shadow-md"
                        onClick={() => navigate(ROUTES.postJob)}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <Briefcase className="h-6 w-6 text-indigo-600" />
                            </div>
                            <h2 className="text-lg font-semibold mb-2">Post Job Listing</h2>
                            <p className="text-gray-500 text-sm">
                                Post a job opening in your company where candidates can apply directly
                            </p>
                        </div>
                    </button>

                    {/* Project Posting Card */}
                    <button 
                        className="hover:bg-secondary transition duration-200 ease-in-out rounded-lg p-6 shadow-md"
                        onClick={() => navigate(ROUTES.postProject)}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <FileText className="h-6 w-6 text-indigo-600" />
                            </div>
                            <h2 className="text-lg font-semibold mb-2">Post Project</h2>
                            <p className="text-gray-500 text-sm">
                                Post a project that needs collaboration or share your work with the community
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Seeking;