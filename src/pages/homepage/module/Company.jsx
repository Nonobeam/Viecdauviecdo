import { Badge } from "@/components/ui/badge"

const Company = () => {
    const projects = Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        title: "DeFi Platform",
        teamSize: "8 members",
        description: "Developing a decentralized finance application with focus on security and scalability",
        image: "/fake/meu.png",
    }))

    return (
        <div className="h-210 overflow-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* <AnimatedPinDemo /> */}
                {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg overflow-hidden bg-card">
                        {/* Image Container */}
                        <div className="relative aspect-[16/9] bg-muted">
                            <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Container */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                                    Pay-to-go
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Team Size: {project.teamSize}</p>
                                <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Company;