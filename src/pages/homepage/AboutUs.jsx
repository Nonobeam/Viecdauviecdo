import { InfiniteMovingCardsDemo } from "@/components/ReviewMovingCard";
import TeamMembersCarousel from '@/components/TeamMemberCarousel'; // Adjust the import path as needed
import { ChevronLeft, ChevronRight, Globe, MessageCircle, Smile, Target, User, Users } from 'lucide-react';

const About = () => {
    const stats = [
        {
            value: "10M+",
            label: "Users Worldwide",
            icon: <Users className="w-8 h-8 text-indigo-600" />,
        },
        {
            value: "95%",
            label: "Client Satisfaction",
            icon: <Smile className="w-8 h-8 text-indigo-600" />,
        },
        {
            value: "150+",
            label: "Team Members",
            icon: <User className="w-8 h-8 text-indigo-600" />,
        },
        {
            value: "8",
            label: "Global Offices",
            icon: <Globe className="w-8 h-8 text-indigo-600" />,
        },
    ];

    return (
        <main className="w-full px-4 py-16 h-[90vh] overflow-y-auto">
            {/* About Us Section */}
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h1 className="text-4xl font-bold mb-6 flex items-center justify-center">
                    <Target className="w-8 h-8 mr-2 text-indigo-600" />
                    About Us
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    We're on a mission to transform how people work and create. Our platform empowers teams to achieve their
                    full potential through innovative solutions and seamless collaboration.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center p-6 bg-gray-50 rounded-lg shadow-sm transition-transform hover:-translate-y-1">
                        <div className="flex justify-center mb-2">{stat.icon}</div>
                        <div className="text-3xl font-bold mb-2 text-indigo-600">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Leadership Team Section with Carousel */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-12 flex items-center justify-center">
                    <Users className="w-8 h-8 mr-2 text-indigo-600" />
                    Our Leadership Team
                </h2>
                <TeamMembersCarousel />
            </div>

            <InfiniteMovingCardsDemo />

            {/* ChatWidget with Lucide Icon */}
            <div className="fixed bottom-4 left-4">
                <button className="bg-green-500 text-white p-3 rounded-full flex items-center shadow-lg hover:bg-green-600">
                    <MessageCircle className="w-6 h-6 mr-2" />
                    Chatbot
                </button>
            </div>

            {/* Navigation with Lucide Icons */}
            <div className="fixed bottom-4 right-4 flex items-center space-x-2">
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>
        </main>
    );
};

export default About;