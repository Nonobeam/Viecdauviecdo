import DarkModeToggle from "@/components/DarkModeToggle";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDarkMode from "@/hooks/useDarkMode";
import { login as apiLogin } from "@/utils/authApi";
import { createUser as apiRegister } from "@/utils/userApi";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleLogin = async () => {
    try {
      const { token } = await apiLogin({ username: email, password });
      Cookies.set("token", token, { expires: 7 });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) return alert("Passwords do not match");
    if (!agreeTerms) return alert("You must agree to the terms");

    try {
      await apiRegister({
        email,
        password,
        roleName: "USER",
        image: undefined,
      });
      alert("Registration successful — please login");
      setActiveTab("login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  const renderSocialLogins = () => (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
          </span>
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
    </>
  );

  return (
    <div className={`flex h-screen w-full ${isDarkMode ? "dark" : ""}`}>
      <div className="hidden md:flex md:w-5/12 flex-col justify-center px-12 bg-indigo-600 text-white">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to
          <br />
          <Link to="/" className="hover:text-indigo-300 transition-colors">
            Matchlent
          </Link>
        </h1>
        <p className="text-lg opacity-90 italic">
          “Connect, collaborate, and bring your unique projects to life—beyond
          work, beyond limits.”
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-8 md:p-12 w-full md:w-7/12 bg-background">
        <DarkModeToggle />
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v)}
          className="w-[600px]"
        >
          <TabsList className="grid w-full grid-cols-2 h-14 text-lg bg-gray-100 rounded-xl p-1">
            <TabsTrigger
              value="login"
              className="rounded-xl h-full data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow text-gray-600"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-xl h-full data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow text-gray-600"
            >
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="h-12"
                  />
                </div>
                <div className="text-right">
                  <a href="#" className="text-primary hover:underline text-sm">
                    Forgot password?
                  </a>
                </div>
                <Button
                  className="w-full h-12 text-base bg-primary/10 hover:bg-primary/20 text-primary"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                {renderSocialLogins()}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="h-12"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              <Button
                className="w-full h-12 text-base bg-primary/10 hover:bg-primary/20 text-primary"
                onClick={handleRegister}
              >
                Register
              </Button>
              {renderSocialLogins()}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
