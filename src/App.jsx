import { DarkModeProvider } from "@/hooks/DarkModeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/homepage/HomePage";
import Blog from "./pages/homepage/Blog";
import AboutUs from "./pages/homepage/AboutUs";

function App() {
    return (
        <DarkModeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Blog />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/job" element={<Home />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                </Routes>
            </Router>
        </DarkModeProvider>
    );
}

export default App;