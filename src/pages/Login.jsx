import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { Moon } from "lucide-react"
import { useState } from "react"

function Login() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <div className={`flex h-screen w-full ${isDarkMode ? "dark" : ""}`}>
            {/* Left side - Purple background with text */}
            <div className="hidden md:flex md:w-5/12 flex-col justify-center px-12 bg-indigo-600 text-white">
                <h1 className="text-6xl font-bold mb-4">
                    Chào mừng tới
                    <br />
                    <span className="hover:text-indigo-300 transition-colors duration-300">Viecdauviecdo</span>
                </h1>
                <p className="text-lg opacity-90 italic">
                    Kết nối, cộng tác và hiện thực hóa các dự án độc đáo của bạn — vượt qua ngoài công việc, vượt qua những giới
                    hạn.
                </p>
            </div>

            {/* Right side - Login form */}
            <div className="flex flex-col items-center justify-center p-8 md:p-12 w-full md:w-7/12 bg-background">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleDarkMode}
                    className="absolute top-0 right-0 m-4 rounded-full h-14 w-14 p-4 bg-muted"
                >
                    <Moon className="h-6 w-6" />
                    <span className="sr-only">Toggle dark mode</span>
                </Button>
                <div className="flex justify-between items-center mb-8">
                    <Tabs defaultValue="login" className="w-[600px]">
                        <TabsList className="grid w-full grid-cols-2 h-14 text-lg">
                            <TabsTrigger
                                value="login"
                                className="text-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-primary-foreground"
                            >
                                Đăng nhập
                            </TabsTrigger>
                            <TabsTrigger
                                value="signup"
                                className="text-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-primary-foreground"
                            >
                                Đăng ký
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="login" className="mt-6">
                            <div className="max-w-md mx-auto space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="Email của bạn" className="h-12" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Mật khẩu</Label>
                                        <Input id="password" type="password" placeholder="Mật khẩu" className="h-12" />
                                    </div>

                                    <div className="text-right">
                                        <a href="#" className="text-primary hover:underline text-sm">
                                            Quên mật khẩu?
                                        </a>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button className="flex-1 h-12 text-base bg-primary/10 hover:bg-primary/20 text-primary">
                                            Đăng nhập
                                        </Button>
                                        <Button variant="outline" className="flex-1 h-12 text-base">
                                            Đăng ký
                                        </Button>
                                    </div>

                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t"></span>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">hoặc tiếp tục với</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <Button variant="outline" className="h-12">
                                            Google
                                        </Button>
                                        <Button variant="outline" className="h-12">
                                            LinkedIn
                                        </Button>
                                        <Button variant="outline" className="h-12">
                                            GitHub
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="signup" className="mt-6">
                            <div className="max-w-md mx-auto space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Họ và tên</Label>
                                        <Input id="name" type="name" placeholder="Họ và tên" className="h-12" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="Email của bạn" className="h-12" />
                                    </div>

                                    {/* Password field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-password">Mật khẩu</Label>
                                        <Input id="signup-password" type="password" placeholder="Tạo mật khẩu" className="h-12" />
                                    </div>

                                    {/* Confirm Password field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                                        <Input id="confirm-password" type="password" placeholder="Xác nhận lại mật khẩu" className="h-12" />
                                    </div>

                                    {/* Terms and Conditions */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" />
                                        <label htmlFor="terms" className="text-sm text-muted-foreground">
                                        Tôi đồng ý với{" "}
                                        <a href="#" className="text-primary hover:underline">
                                            Các điều khoản dịch vụ
                                        </a>{" "}
                                        và{" "}
                                        <a href="#" className="text-primary hover:underline">
                                            Chính sách bảo mật
                                        </a>
                                        </label>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button className="flex-1 h-12 text-base bg-primary/10 hover:bg-primary/20 text-primary">
                                            Đăng nhập
                                        </Button>
                                        <Button variant="outline" className="flex-1 h-12 text-base">
                                            Đăng ký
                                        </Button>
                                    </div>

                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t"></span>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">hoặc tiếp tục với</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <Button variant="outline" className="h-12">
                                            Google
                                        </Button>
                                        <Button variant="outline" className="h-12">
                                            LinkedIn
                                        </Button>
                                        <Button variant="outline" className="h-12">
                                            GitHub
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

export default Login