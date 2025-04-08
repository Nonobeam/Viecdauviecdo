import { Badge } from "@/components/ui/badge";
import ChatbotButton from "@/components/ui/ChatbotButton";
import { companies } from "@/mock/data";
import { useNavigate } from "react-router-dom";

const Company = () => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/company/${id}`);
    };

    return (
        <div className="h-full overflow-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {companies.map((project) => (
                    <button
                        key={project.id}
                        className="border rounded-lg overflow-hidden bg-card cursor-pointer"
                        onClick={() => handleCardClick(project.id)}
                    >
                        <div className="relative aspect-[16/9] bg-muted">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                                    Pay-to-go
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Company Size: {project.companySize}</p>
                                <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            <ChatbotButton/>
        </div>
    );
};

export default Company;