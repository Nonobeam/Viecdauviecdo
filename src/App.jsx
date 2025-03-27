import { DarkModeProvider } from "@/hooks/DarkModeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Home, Blog, AboutUs, MainLayout, CareerPathBuilder, Profile } from "./pages/index";

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
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Route>
                </Routes>
            </Router>
        </DarkModeProvider>
    );
}

export default App;