import { DarkModeProvider } from "@/hooks/DarkModeContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
    AboutUs,
    AddProject,
    Blog,
    CareerPathBuilder,
    CompanyProfile,
    EditProfile,
    Home,
    InsertCV,
    Login,
    MainLayout,
    PostJob,
    PostProject,
    Profile,
    ProjectDetails,
    Seeking,
} from "./pages";

function App() {
    return (
        <DarkModeProvider>
            <div className="overflow-y-auto h-screen">
                <Router>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/job" element={<Home />} />
                            <Route path="/aboutus" element={<AboutUs />} />
                            <Route path="/career" element={<CareerPathBuilder />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/edit-profile" element={<EditProfile />} />
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