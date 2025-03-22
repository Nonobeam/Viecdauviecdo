const About = () => {
    const stats = [
        {
            value: "10M+",
            label: "Users Worldwide",
            textColor: "text-indigo-600",
        },
        {
            value: "95%",
            label: "Client Satisfaction",
            textColor: "text-indigo-600",
        },
        {
            value: "150+",
            label: "Team Members",
            textColor: "text-indigo-600",
        },
        {
            value: "8",
            label: "Global Offices",
            textColor: "text-indigo-600",
        },
    ]

    const teamMembers = [
        {
            name: "John Doe",
            role: "CEO & Founder",
            image: "/placeholder.svg",
        },
        {
            name: "Jane Smith",
            role: "CTO",
            image: "/placeholder.svg",
        },
    ]

    return (
        <main className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h1 className="text-4xl font-bold mb-6">About Us</h1>
                <p className="text-lg text-muted-foreground">
                    We're on a mission to transform how people work and create. Our platform empowers teams to achieve their
                    full potential through innovative solutions and seamless collaboration.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center p-6 bg-card rounded-lg shadow-sm">
                        <div className={`text-3xl font-bold mb-2 ${stat.textColor}`}>{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Leadership Team Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-12">Our Leadership Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="group">
                            <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-4">
                                <img
                                    src={member.image || "/placeholder.svg"}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <p className="text-muted-foreground">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default About