import ViecdauviecdoLogo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import { BadgeDollarSign, ChevronDown, History, LogOut, Search, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const UserDropdown = ({ logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative">
        <Button
          className="cursor-pointer flex items-center gap-2"
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          <User size={16} />
          Menu
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <div className="py-1">
              <Link to="/profile">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={16} />
                  Profile
                </button>
              </Link>

              <Link to="/seeking">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Search size={16} />
                  Seeking
                </button>
              </Link>

              <Link to="/account-plan">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <BadgeDollarSign size={16} />
                  Account plan
                </button>
              </Link>

              <Link to="/transaction-history">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <History size={16} />
                  Transaction History
                </button>
              </Link>

              <hr className="my-1 border-gray-200" />

              <Link to="/">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

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
              <UserDropdown logout={logout} />
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
