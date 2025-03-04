import { useDarkMode } from "@/hooks/DarkModeContext";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className="absolute bottom-0 right-0 m-4 rounded-full h-14 w-14 p-4 bg-muted text-black dark:text-white"
        >
            {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            <span className="sr-only">Toggle dark mode</span>
        </button>
    );
};

export default DarkModeToggle;