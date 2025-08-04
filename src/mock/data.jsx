import { Star, Crown, Zap } from "lucide-react";

const talents = [
  {
    id: 1,
    name: "Kiều Oanh",
    location: "Quận 1, TP.HCM",
    role: "Siêu sao nhạc Rock",
    avatar: "/imgs/oanh.jpg",
    fallback: "JD",
    skills: [
      { id: "1", name: "Rock", color: "bg-purple-100 text-purple-700" },
      { id: "2", name: "Hát Bolero", color: "bg-green-100 text-green-700" },
      { id: "3", name: "Đánh đàn", color: "bg-blue-100 text-blue-700" },
    ],
  },
  {
    id: 2,
    name: "Minh Tuấn",
    location: "New York",
    role: "Cooking",
    avatar: "/imgs/tuan.jpg",
    fallback: "JS",
    skills: [
      {
        id: "1",
        name: "Cook your house work",
        color: "bg-green-100 text-green-700",
      },
      { id: "2", name: "Cook your BF", color: "bg-red-100 text-red-700" },
    ],
  },
  {
    id: 3,
    name: "Huu Phuc",
    location: "London",
    role: "Full Stack Developer",
    avatar: "/imgs/phuc.jpg",
    fallback: "AJ",
    skills: [
      { id: "1", name: "Angular", color: "bg-orange-100 text-orange-700" },
      { id: "2", name: "Spring Boot", color: "bg-yellow-100 text-yellow-700" },
    ],
  },
  {
    id: 4,
    name: "Michael Brown",
    location: "Berlin",
    role: "Backend Engineer",
    avatar: "/imgs/huy.jpg",
    fallback: "MB",
    skills: [
      { id: "1", name: "Java", color: "bg-blue-100 text-blue-700" },
      { id: "2", name: "Kubernetes", color: "bg-gray-100 text-gray-700" },
    ],
  },
  {
    id: 5,
    name: "An Dao",
    location: "Tokyo",
    role: "Cloud Architect",
    avatar: "/imgs/an.jpg",
    fallback: "SW",
    skills: [
      { id: "1", name: "AWS", color: "bg-yellow-100 text-yellow-700" },
      { id: "2", name: "Terraform", color: "bg-green-100 text-green-700" },
    ],
  },
  {
    id: 6,
    name: "Bảo Chi",
    location: "Sydney",
    role: "DevOps Engineer",
    avatar: "/imgs/chi.jpg",
    fallback: "RM",
    skills: [
      { id: "1", name: "Docker", color: "bg-blue-100 text-blue-700" },
      { id: "2", name: "CI/CD", color: "bg-purple-100 text-purple-700" },
    ],
  },
  {
    id: 7,
    name: "Robert Martinez",
    location: "Sydney",
    role: "DevOps Engineer",
    avatar: "/placeholder.svg",
    fallback: "RM",
    skills: [
      { id: "1", name: "Docker", color: "bg-blue-100 text-blue-700" },
      { id: "2", name: "CI/CD", color: "bg-purple-100 text-purple-700" },
    ],
  },
  {
    id: 8,
    name: "Robert Martinez",
    location: "Sydney",
    role: "DevOps Engineer",
    avatar: "/placeholder.svg",
    fallback: "RM",
    skills: [
      { id: "1", name: "Docker", color: "bg-blue-100 text-blue-700" },
      { id: "2", name: "CI/CD", color: "bg-purple-100 text-purple-700" },
    ],
  },
  {
    id: 9,
    name: "Robert Martinez",
    location: "Sydney",
    role: "DevOps Engineer",
    avatar: "/placeholder.svg",
    fallback: "RM",
    skills: [
      { id: "1", name: "Docker", color: "bg-blue-100 text-blue-700" },
      { id: "2", name: "CI/CD", color: "bg-purple-100 text-purple-700" },
    ],
  },
];

export const blogs = [
  {
    id: 1,
    avatar: "/imgs/oanh.jpg",
    name: "Nguyễn Kiều Oanh",
    role: "Senior UX Designer",
    time: "2h ago",
    title: "The Future of Design Systems",
    content:
      "Design systems have become the backbone of modern product development, ensuring consistency, efficiency, and scalability across teams. Over the past few years, I've worked with various teams implementing and evolving design systems, and I've observed key trends that will shape the future of this space. \n\nOne of the biggest shifts is towards Modular Architecture. The most successful design systems today embrace modularity, allowing teams to adopt components incrementally instead of requiring full buy-in. This lowers the barrier to entry and ensures that different teams can adopt only what they need, fostering higher adoption rates across large organizations. \n\nAnother significant development is Automation & AI Integration. We're seeing a major push toward automating tedious design documentation, accessibility checks, and even component recommendations. AI-driven design assistants are helping teams create consistent UI faster, while automated testing ensures that new changes don’t break existing patterns. These tools not only improve efficiency but also help maintain brand integrity. \n\nAccessibility First has become a fundamental principle rather than an afterthought. Regulatory requirements and a growing emphasis on inclusive design have forced companies to embed accessibility guidelines directly into their design systems. Ensuring color contrast compliance, keyboard navigation, and screen reader compatibility from the start leads to a more inclusive user experience. \n\nLooking ahead, I expect these trends to continue evolving. Design systems will become even more intelligent, adaptable, and integral to product development workflows. What are your thoughts on these trends? How does your organization handle design system adoption and evolution?",
    likes: 234,
    comments: 12,
    shares: 5,
  },
  {
    id: 2,
    avatar: "/imgs/an.jpg",
    name: "David Miller",
    role: "Software Engineer",
    time: "5h ago",
    title: "Microservices vs Monolith: Which One Wins?",
    content:
      "The debate between Microservices and Monolithic architecture has been ongoing for years, and there’s no one-size-fits-all answer. Each approach has its own strengths and weaknesses, depending on the needs of a project or organization. \n\nMicroservices have revolutionized the way we build scalable applications. By breaking down applications into smaller, independent services, teams can deploy, scale, and maintain each service separately. This allows for faster iteration cycles, better fault isolation, and increased technology diversity. However, microservices introduce complexity in areas like inter-service communication, distributed data management, and operational overhead. Teams need robust monitoring, logging, and orchestration tools to manage these challenges effectively. \n\nOn the other hand, Monolithic architectures remain a solid choice for many businesses, especially startups and small-scale applications. A single, unified codebase simplifies development, testing, and deployment, reducing operational costs. However, as applications grow, monoliths can become difficult to maintain, making feature development slower and deployments riskier. Scaling is also more challenging since every part of the application must be scaled together, rather than optimizing specific bottlenecks. \n\nChoosing between these architectures depends on factors such as team size, project complexity, and long-term goals. For startups, beginning with a monolith and transitioning to microservices later might be the most practical approach. What’s your experience with these architectures? Have you faced challenges when migrating from one to the other?",
    likes: 198,
    comments: 34,
    shares: 10,
  },
  {
    id: 3,
    avatar: "/imgs/chi.jpg",
    name: "Linda Chang",
    role: "AI Researcher",
    time: "1 day ago",
    title: "The Rise of Generative AI in Content Creation",
    content:
      "Generative AI is transforming how content is created, enabling automation at an unprecedented scale. From text generation and image synthesis to music composition and video editing, AI models are increasingly capable of producing high-quality content with minimal human intervention. \n\nTools like ChatGPT and MidJourney are being used to streamline business operations, providing AI-generated content that enhances marketing, customer engagement, and even product design. Businesses can now generate blog posts, write scripts, create social media graphics, and even develop code snippets, significantly reducing manual effort. \n\nHowever, with this technological advancement comes ethical and legal challenges. The rise of deepfakes, misinformation, and AI-generated plagiarism is a growing concern. As AI-generated content becomes more realistic, it becomes harder to distinguish between machine-created and human-authored work. Additionally, copyright laws haven’t fully caught up with AI-generated assets, leaving a gray area regarding ownership and accountability. \n\nDespite these challenges, the potential of generative AI is immense. When used responsibly, it can accelerate creative workflows, assist professionals, and open new doors for innovation. How do you see AI shaping the future of content creation, and what steps should we take to ensure ethical usage?",
    likes: 312,
    comments: 56,
    shares: 21,
  },
  {
    id: 4,
    avatar: "/imgs/huy.jpg",
    name: "Mike Johnson",
    role: "Cybersecurity Analyst",
    time: "3 days ago",
    title: "The Growing Importance of Zero Trust Security",
    content:
      "With cyber threats evolving at an alarming rate, traditional perimeter-based security models are proving inadequate. Organizations can no longer rely on firewalls and VPNs alone; instead, they must adopt a Zero Trust approach to security. \n\nZero Trust is built on the principles of continuous verification, least privilege access, and the assumption that threats exist both inside and outside the network. Unlike traditional models that grant broad access once authentication is completed, Zero Trust enforces strict identity verification and permissions for every access request. \n\nImplementing Zero Trust requires a combination of strong authentication mechanisms, endpoint security, network segmentation, and real-time monitoring. Companies must adopt technologies like multi-factor authentication (MFA), identity and access management (IAM), and security information and event management (SIEM) systems to maintain a robust defense. \n\nWhile the shift to Zero Trust is challenging, it’s becoming essential in today’s landscape of ransomware attacks, insider threats, and supply chain vulnerabilities. Organizations that fail to adopt modern security practices risk significant financial and reputational damage. How is your organization handling these evolving security challenges?",
    likes: 270,
    comments: 40,
    shares: 15,
  },
  {
    id: 5,
    avatar: "/imgs/phuc.jpg",
    name: "Emily Carter",
    role: "Product Manager",
    time: "1 week ago",
    title: "Why Customer Feedback is Your Secret Weapon",
    content:
      "Successful products aren’t built in isolation—they are shaped by the voices of the customers who use them. Gathering and analyzing customer feedback is one of the most powerful ways to ensure product-market fit, improve user experience, and drive business success. \n\nCustomer feedback helps validate ideas before significant development effort is invested. By understanding user pain points early, teams can avoid costly redesigns and wasted resources. Moreover, continuously iterating based on user insights leads to better retention, stronger engagement, and long-term loyalty. \n\nThere are several ways to collect meaningful feedback: surveys, user interviews, customer support tickets, and analytics. However, feedback alone isn’t enough—it must be effectively analyzed and prioritized. Not all customer requests should dictate product changes, but patterns and common themes can highlight areas that truly need attention. \n\nGreat companies build feedback loops directly into their workflows. Teams that listen to their users and take action create products that not only solve problems but also delight customers. How do you incorporate customer feedback into your product development cycle?",
    likes: 350,
    comments: 78,
    shares: 30,
  },
];

export const plans = [
  {
    id: "free",
    name: "Miễn phí",
    price: "0",
    period: "Mãi mãi",
    description: "Hoàn hảo để bắt đầu",
    popular: false,
    benefits: [
      "Ứng tuyển 5 công việc mỗi tháng",
      "Tạo hồ sơ cơ bản",
      "Bộ lọc tìm kiếm việc làm",
      "Thông báo email",
      "Mẫu CV tiêu chuẩn",
    ],
    buttonText: "Bắt đầu ngay",
    buttonStyle: "bg-gray-600 hover:bg-gray-700 text-white",
  },
  {
    id: "premium",
    name: "Premium",
    price: "59000",
    period: "mỗi tháng",
    description: "Mở khóa tiềm năng nghề nghiệp",
    popular: true,
    trialDays: 7,
    benefits: [
      "Ứng tuyển không giới hạn",
      "Tối ưu CV bằng AI",
      "Ưu tiên trong danh sách ứng viên",
      "Phân tích và thống kê nâng cao",
      "Gợi ý việc làm cá nhân hóa",
      "Nhắn tin trực tiếp với nhà tuyển dụng",
      "Mẫu CV cao cấp",
      "Công cụ chuẩn bị phỏng vấn",
      "Hướng dẫn thương lượng lương",
      "Tư vấn nghề nghiệp cá nhân",
      "Hỗ trợ khách hàng 24/7",
    ],
    buttonText: "Nâng cấp Premium",
    buttonStyle: "bg-indigo-600 hover:bg-indigo-700 text-white",
  },
];

export const projects = [
  {
    id: 0,
    title: "DeFi Platform",
    teamSize: "8 members",
    description:
      "Developing a decentralized finance application with a focus on security and scalability. This platform integrates smart contracts to provide secure and transparent financial services.",
    image: "/fake/defi-platform.png",
  },
  {
    id: 1,
    title: "AI-Powered Resume Screener",
    teamSize: "5 members",
    description:
      "Building an AI-driven tool that helps HR teams filter resumes based on skills, experience, and job descriptions. The model leverages NLP for smart candidate matching.",
    image: "/fake/ai-resume.png",
  },
  {
    id: 2,
    title: "E-Commerce Analytics Dashboard",
    teamSize: "6 members",
    description:
      "Developing a real-time analytics dashboard for e-commerce businesses to track sales, customer behavior, and conversion rates using AI-driven insights.",
    image: "/fake/ecommerce-dashboard.png",
  },
  {
    id: 3,
    title: "Healthcare Appointment System",
    teamSize: "7 members",
    description:
      "Creating a smart appointment scheduling system that optimizes doctor-patient availability and reduces waiting times using AI-powered scheduling algorithms.",
    image: "/fake/healthcare-app.png",
  },
];

export const companies = [
  {
    id: 0,
    title: "TechSphere",
    companySize: "150+ employees",
    description:
      "A leading AI and cloud computing company specializing in data-driven solutions.",
    image: "/fake/techsphere.png",
  },
  {
    id: 1,
    title: "FinNext",
    companySize: "80+ employees",
    description:
      "A fintech startup revolutionizing digital payments with blockchain technology.",
    image: "/fake/finnext.png",
  },
  {
    id: 2,
    title: "HealthSync",
    companySize: "120+ employees",
    description:
      "A health-tech company providing AI-powered patient management systems.",
    image: "/fake/healthsync.png",
  },
  {
    id: 3,
    title: "EduWave",
    companySize: "60+ employees",
    description:
      "An ed-tech firm developing AI-assisted learning platforms for students.",
    image: "/fake/eduwave.png",
  },
  {
    id: 4,
    title: "CyberGuard",
    companySize: "90+ employees",
    description:
      "A cybersecurity firm offering advanced threat detection and data protection services.",
    image: "/fake/cyberguard.png",
  },
  {
    id: 5,
    title: "GreenGen",
    companySize: "50+ employees",
    description:
      "A renewable energy startup focused on innovative solar and wind energy solutions.",
    image: "/fake/greengen.png",
  },
  {
    id: 6,
    title: "AutoMinds",
    companySize: "200+ employees",
    description:
      "An AI-powered automotive company enhancing self-driving car technology.",
    image: "/fake/autominds.png",
  },
  {
    id: 7,
    title: "RetailBoost",
    companySize: "75+ employees",
    description:
      "A retail analytics company providing AI-driven insights for customer engagement.",
    image: "/fake/retailboost.png",
  },
];

export default talents;
