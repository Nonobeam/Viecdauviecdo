import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import PaymentLayout from "./layout/PaymentLayout"
import ProtectedRoute from "./components/protectedRoute"
import {
    AboutUs,
    AddProject,
    Activate,
    ApplicationForm,
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
    ChangeInformation,
    ProjectDetails,
    Seeking,
    SuccessPage,
    TransactionHistory,
    ChangePassword,
} from "./pages"
import Project from "./pages/homepage/module/Project"

function App() {
  return (
      <div className="overflow-y-auto h-screen">
        <Router>
          <Routes>
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

              <Route path="*" element={<div>404 Not Found</div>} />
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
          </Routes>
        </Router>
      </div>
  )
}

export default App
