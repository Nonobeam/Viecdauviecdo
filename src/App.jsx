import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import PaymentLayout from "./layout/PaymentLayout";
import {
  AboutUs,
  Activate,
  AddProject,
  AdminDashboard,
  ApplicationForm,
  Blog,
  CancelPage,
  CareerPathBuilder,
  ChangeInformation,
  ChangePassword,
  CompanyProfile,
  EditProfile,
  EditProject,
  ErrorPage,
  Feedback,
  Home,
  InsertCV,
  Job,
  Login,
  MainLayout,
  PaymentPage,
  PremiumPlansPage,
  Profile,
  ProfileViewer,
  ProjectDetails,
  Seeking,
  SkillsAndLinks,
  SuccessPage,
  TransactionHistory,
} from "./pages";
import Project from "./pages/homepage/module/Project";

function App() {

  const isBusinessSubdomain = window.location.hostname === 'business.matchlent.xyz';
  return (
    <div className="overflow-y-auto h-screen">
      <Router>
        <Routes>
          {isBusinessSubdomain ? (
            <Route path="/" element={<AdminDashboard />} />
          ) : (
          <>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activate" element={<Activate />} />
            <Route path="/job" element={<Home />} />
            <Route path="/job-list" element={<Job />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/company/:id" element={<CompanyProfile />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project" element={<Project />} />
            <Route path="/seeking" element={<Seeking />} />

            <Route
              path="/account-plan"
              element={
                <ProtectedRoute>
                  <PremiumPlansPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/transaction-history"
              element={
                <ProtectedRoute>
                  <TransactionHistory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/career"
              element={
                <ProtectedRoute>
                  <CareerPathBuilder />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <ProfileViewer />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/change-profile"
              element={
                <ProtectedRoute>
                  <ChangeInformation />
                </ProtectedRoute>
              }
            />

            <Route
              path="/skills-links"
              element={
                <ProtectedRoute>
                  <SkillsAndLinks />
                </ProtectedRoute>
              }
            />

            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />

            <Route
              path="/insert-cv"
              element={
                <ProtectedRoute>
                  <InsertCV />
                </ProtectedRoute>
              }
            />

            <Route
              path="/insert-project"
              element={
                <ProtectedRoute>
                  <AddProject />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-project/:id"
              element={
                <ProtectedRoute>
                  <EditProject />
                </ProtectedRoute>
              }
            />

            <Route
              path="/apply/:id"
              element={
                <ProtectedRoute>
                  <ApplicationForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Route>

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<PaymentPage />} />
            <Route path="success" element={<SuccessPage />} />
            <Route path="cancel" element={<CancelPage />} />
          </Route>
          
          {/* <Route path="/admin" element={<AdminDashboard />}></Route> */}
          </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
