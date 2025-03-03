import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Talent = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold">John Doe</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                    React
                                </Badge>
                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                    Node.js
                                </Badge>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                    TypeScript
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Seeking Senior Developer Role</p>
                        <p className="text-sm text-muted-foreground">San Francisco</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Talent;