import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import useDarkMode from "@/hooks/useDarkMode";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Logo } from '@/components/icons/Logo';
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useDarkMode();

    const handleFakeLogin = () => {
        Cookies.set("user", JSON.stringify({ name: "John Doe", email: "john.doe@example.com" }), { expires: 7 });
        console.log("Logged in successfully!");
        navigate("/");
    };

    return (
        <div className={`flex h-screen w-full ${isDarkMode ? "dark" : ""}`}>
            {/* Left side - Purple background with text */}
            <div className="hidden md:flex md:w-5/12 flex-col justify-center px-12 bg-indigo-600 text-white">
                <h1 className="text-6xl font-bold mb-4">
                    Welcome to
                    <br />
                    <Link to="/" className="hover:text-indigo-300 transition-colors duration-300">
                        Matchlent
                    </Link>
                </h1>
                <p className="text-lg opacity-90 italic">
                    "Connect, collaborate, and bring your unique projects to life—beyond work, beyond limits."
                </p>
            </div>

            {/* Right side - Login form */}
            <div className="flex flex-col items-center justify-center p-8 md:p-12 w-full md:w-7/12 bg-background">
                <DarkModeToggle />
                <div className="flex justify-between items-center mb-8">
                    <Tabs defaultValue="login" className="w-[600px]">
                        <TabsList className="grid w-full grid-cols-2 h-14 text-lg">
                            <TabsTrigger
                                value="login"
                                className="text-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-primary-foreground"
                            >
                                Login
                            </TabsTrigger>
                            <TabsTrigger
                                value="signup"
                                className="text-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-primary-foreground"
                            >
                                Register
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="login" className="mt-6">
                            <div className="max-w-md mx-auto space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="Your Email" className="h-12" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" placeholder="Password" className="h-12" />
                                    </div>

                                    <div className="text-right">
                                        <a href="#" className="text-primary hover:underline text-sm">
                                            Forget password?
                                        </a>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button 
                                            className="flex-1 h-12 text-base bg-primary/10 hover:bg-primary/20 text-primary cursor-pointer"
                                            onClick={handleFakeLogin}>
                                            Login
                                        </Button>
                                        <Button variant="outline" className="flex-1 h-12 text-base cursor-pointer">
                                            Register
                                        </Button>
                                    </div>

                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t"></span>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">or continue with</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <Button variant="outline" className="h-12">
                                            {Logo.google} Google
                                        </Button>
                                        <Button variant="outline" className="h-12">
                                            {Logo.linkedIn} LinkedIn
                                        </Button>
                                        <Button variant="outline" className="h-12">
                                            {Logo.github} GitHub
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="signup" className="mt-6">
                            <div className="max-w-md mx-auto space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full name</Label>
                                        <Input id="name" type="name" placeholder="Full name" className="h-12" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="Your Email" className="h-12" />
                                    </div>

                                    {/* Password field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-password">Password</Label>
                                        <Input id="signup-password" type="password" placeholder="Password" className="h-12" />
                                    </div>

                                    {/* Confirm Password field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm your password</Label>
                                        <Input id="confirm-password" type="password" placeholder="Confirm your password" className="h-12" />
                                    </div>

                                    {/* Terms and Conditions */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" />
                                        <label htmlFor="terms" className="text-sm text-muted-foreground">
                                            I agree to the{" "}
                                            <a href="#" className="text-primary hover:underline">
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a href="#" className="text-primary hover:underline">
                                                Privacy Policy
                                            </a>
                                        </label>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            className="flex-1 h-12 text-base bg-primary/10 hover:bg-primary/20 text-primary"
                                            onClick={handleFakeLogin}
                                        >
                                            Login
                                        </Button>
                                        <Button variant="outline" className="flex-1 h-12 text-base">
                                            Register
                                        </Button>
                                    </div>

                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t"></span>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">or continue with</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <Button variant="outline" className="h-12">
                                            {Logo.google} Google
                                        </Button>
                                        <Button variant="outline" className="h-12">
                                            {Logo.linkedIn} LinkedIn
                                        </Button>
                                        <Button variant="outline" className="h-12">
                                            {Logo.github} GitHub
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
export default Login;