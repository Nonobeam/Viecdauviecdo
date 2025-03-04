import ViecdauviecdoLogo from "@/components/Logo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { useState } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <header className="border-b">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-xl font-semibold">
                            <ViecdauviecdoLogo />
                        </Link>
                        <nav className="hidden md:flex space-x-6">
                            <Link to="/" className="text-primary">
                                Trang chủ
                            </Link>
                            <Link to="/aboutus" className="text-muted-foreground hover:text-primary">
                                Về chúng tôi
                            </Link>
                            <Link to="/career" className="text-muted-foreground hover:text-primary">
                                Giá trị bền vững
                            </Link>
                            <Link to="/job" className="text-muted-foreground hover:text-primary">
                                Blog
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Button variant="ghost">Hồ sơ</Button>
                                <Button>Dự án</Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link to="/login">
                                    <Button>Register</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}