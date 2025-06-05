import { Briefcase, User } from 'lucide-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const TeamMembersCarousel = () => {
    const teamMembers = [
        {
            name: "Đào An",
            role: "CEO & Founder",
            image: "/imgs/an.jpg",
            icon: <User className="w-5 h-5 text-indigo-600" />,
        },
        {
            name: "Trần Hoàng Bảo Chi",
            role: "CTO",
            image: "/imgs/chi.jpg",
            icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
        },
        {
            name: "Đặng Quang Huy",
            role: "CEO",
            image: "/imgs/huy.jpg",
            icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
        },
        {
            name: "Vĩ Thị Kiều Oanh",
            role: "CBAO",
            image: "/imgs/oanh.jpg",
            icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
        },
        {
            name: "Nguyễn Hữu Phúc",
            role: "CMO",
            image: "/imgs/phuc.jpg",
            icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
        },
        {
            name: "Nguyễn Công minh Tuấn",
            role: "Head of HR",
            image: "/imgs/tuan.jpg",
            icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, // Ensure autoplay is enabled
        autoplaySpeed: 3000, // 3 seconds interval
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="w-full px-4">
            <Slider {...settings}>
                {teamMembers.map((member, index) => (
                    <div key={index} className="px-4">
                        <div className="group">
                            <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-4">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover opacity-0 animate-fadeIn"
                                    onLoad={(e) => (e.target.style.opacity = 1)} // Fallback for fade-in
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                {member.icon}
                                <h3 className="font-semibold text-lg ml-2 text-gray-800">{member.name}</h3>
                            </div>
                            <p className="text-muted-foreground text-center">{member.role}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TeamMembersCarousel;