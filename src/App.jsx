import { DarkModeProvider } from "@/hooks/DarkModeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    Login,
    Home,
    Blog,
    AboutUs,
    MainLayout,
    CareerPathBuilder,
    Profile,
    CompanyProfile,
    ProjectDetails,
    InsertCV,
    AddProject,
    Seeking,
    PostProject,
    PostJob,
} from "./pages";

function App() {
    return (
        <DarkModeProvider>
            <div className="overflow-y-auto h-screen">
                <Router>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Blog />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/job" element={<Home />} />
                            <Route path="/aboutus" element={<AboutUs />} />
                            <Route path="/career" element={<CareerPathBuilder />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/company/:id" element={<CompanyProfile />} />
                            <Route path="/project/:id" element={<ProjectDetails />} />
                            <Route path="/insert-cv" element={<InsertCV />} />
                            <Route path="/insert-project" element={<AddProject />} />
                            <Route path="/seeking" element={<Seeking />} />
                            <Route path="/post-project" element={<PostProject />} />
                            <Route path="/post-job" element={<PostJob />} />
                            <Route path="*" element={<div>404 Not Found</div>} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </DarkModeProvider>
    );
}

export default App;