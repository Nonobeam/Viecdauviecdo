import { DarkModeProvider } from "@/hooks/DarkModeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/homepage/HomePage";
import Blog from "./pages/homepage/Blog";
import AboutUs from "./pages/homepage/AboutUs";
import MainLayout from "./pages/MainLayout";
import CareerPathBuilder from "./pages/homepage/CareerPathBuilder";

function App() {
    return (
        <DarkModeProvider>
            <Router>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Blog />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/job" element={<Home />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/career" element={<CareerPathBuilder />} />

                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Route>
                </Routes>
            </Router>
        </DarkModeProvider>
    );
}

export default App;