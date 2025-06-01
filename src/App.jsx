import { DarkModeProvider } from "@/hooks/DarkModeContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CandidateList from "./company/components/CandidateList";
import CompanySettings from "./company/components/CompanySetting";
import Dashboard from "./company/components/Dashboard";
import HRAccountManager from "./company/components/HRAccountManager";
import HRDashboard from "./company/components/HRDashboard";
import JobForm from "./company/components/JobForm";
import JobList from "./company/components/JobList";
import ServicePackageManager from "./company/components/ServicePackageManager";
import CompanyLayout from "./company/layouts/CompanyLayout";
import PaymentLayout from "./layout/PaymentLayout";
import {
    AboutUs,
    AddProject,
    Blog,
    CancelPage,
    CareerPathBuilder,
    CompanyProfile,
    EditProfile,
    Home,
    InsertCV,
    Login,
    MainLayout,
    PaymentPage,
    PostJob,
    PostProject,
    Profile,
    ProjectDetails,
    Seeking,
    SuccessPage,
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
                        <Route path="/company" element={<CompanyLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="jobs" element={<JobList />} />
                            <Route path="jobs/new" element={<JobForm />} />
                            <Route path="candidates" element={<CandidateList />} />
                            <Route path="hr-accounts" element={<HRAccountManager />} />
                            <Route path="settings" element={<CompanySettings />} />
                            <Route path="packages" element={<ServicePackageManager />} />
                            <Route path="hr-dashboard" element={<HRDashboard />} />
                        </Route>
                        <Route path="/payment" element={<PaymentLayout />}>
                            <Route index element={<PaymentPage />} />
                            <Route path="success" element={<SuccessPage />} />
                            <Route path="cancel" element={<CancelPage />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </DarkModeProvider>
    );
}

export default App;