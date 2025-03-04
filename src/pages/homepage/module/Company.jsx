import AnimatedPinDemo from "@/components/MotionSlider"

const Company = () => {
    const name = "TechCorp";
    const link = "https://techcorp.com";
    const imgSrc = "/fake/meu.png";
    const info = [
        "123 Tech Ave, San Francisco, CA",
        "careers@techcorp.com",
    ];
    const jobList = [
        "Senior Frontend Developer",
        "ML Engineer",
        "Product Manager",
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg p-6 space-y-4 h-128 flex flex-col justify-between">
                    <AnimatedPinDemo title={name} info={info} link={link} imgSrc={imgSrc} jobList={jobList}/>
                </div>
            ))}
        </div>
    );
};

export default Company;