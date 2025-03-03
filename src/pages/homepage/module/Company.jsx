import { Badge } from "@/components/ui/badge";

const Company = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border rounded-lg p-6 space-y-4 h-128 flex flex-col justify-between">
                    <img
                        src="/fake/meu.png"
                        alt="Company Logo"
                        className="h-32 w-full object-cover rounded-md"
                    />

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            123 Tech Ave, San Francisco, CA
                        </p>
                        <p className="text-sm text-muted-foreground">
                            careers@techcorp.com
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold">TechCorp</h3>
                        <div className="flex flex-col flex-wrap gap-x-2 gap-y-2 mt-2">
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-3 py-1">
                                Senior Frontend Developer
                            </Badge>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-3 py-1">
                                ML Engineer
                            </Badge>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-3 py-1">
                                Product Manager
                            </Badge>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Company;