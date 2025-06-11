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
    EditProject,
    Home,
    InsertCV,
    Job,
    Login,
    MainLayout,
    PaymentPage,
    PremiumPlansPage,
    Profile,
    ProjectDetails,
    Seeking,
    SuccessPage,
    TransactionHistory
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
                            <Route path="/account-plan" element={<PremiumPlansPage />} />
                            <Route path="/transaction-history" element={<TransactionHistory />} />
                            <Route path="/job" element={<Home />} />
                            <Route path="/job-list" element={<Job />} />
                            <Route path="/aboutus" element={<AboutUs />} />
                            <Route path="/career" element={<CareerPathBuilder />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/edit-profile" element={<EditProfile />} />
                            <Route path="/company/:id" element={<CompanyProfile />} />
                            <Route path="/project/:id" element={<ProjectDetails />} />
                            <Route path="/insert-cv" element={<InsertCV />} />
                            <Route path="/insert-project" element={<AddProject />} />
                            <Route path="/edit-project/:id" element={<EditProject />} />
                            <Route path="/seeking" element={<Seeking />} />
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