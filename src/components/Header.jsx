import ViecdauviecdoLogo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
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
                Home page
              </Link>
              <Link
                to="/aboutus"
                className="text-muted-foreground hover:text-primary"
              >
                About us
              </Link>
              <Link
                to="/career"
                className="text-muted-foreground hover:text-primary"
              >
                Career path builder
              </Link>
              <Link
                to="/job"
                className="text-muted-foreground hover:text-primary"
              >
                Opportunity
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile">
                  <Button className="cursor-pointer" variant="ghost">
                    Profile
                  </Button>
                </Link>
                <Link to="/seeking">
                  <Button className="cursor-pointer">Seeking</Button>
                </Link>
                <Link to="/">
                  <Button
                    className="cursor-pointer"
                    onClick={logout}
                    variant="ghost"
                  >
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {location.pathname !== "/login" && (
                  <>
                    <Link to="/login">
                      <Button className="cursor-pointer" variant="ghost">
                        Login
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button className="cursor-pointer">Register</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
