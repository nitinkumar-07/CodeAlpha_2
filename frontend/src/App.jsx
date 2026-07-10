import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/authentication/Login"
import Home from "./components/components_lite/Home"
import Register from "./components/authentication/Register"
import PrivacyPolicy from "./components/components_lite/PrivacyPolicy.jsx"
import TermsOfService from "./components/components_lite/TermsOfService.jsx"
import Jobs from "./components/components_lite/Jobs.jsx"
import Browse from "./components/components_lite/Browse.jsx"
import Profile from "./components/components_lite/Profile.jsx"
import Description from "./components/components_lite/Description.jsx"

import Companies from "./components/adminComponent/Companies.jsx";
import CompanyCreate from "./components/adminComponent/CompanyCreate.jsx"
import CompanySetup from "./components/adminComponent/CompanySetup.jsx"
import AdminJobs from "./components/adminComponent/AdminJobs.jsx"
import PostJob from "./components/adminComponent/PostJob.jsx"
import Applicants from "./components/adminComponent/Applicants.jsx"
import ProtectedRoute from "./components/adminComponent/ProtectedRoute.jsx";
import JobSetup from "./components/adminComponent/jobSetup.jsx"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <Description />
  },
  {
    path: "/profile",
    element: <Profile />
  },


  //admin routes

  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id",
    element: (
      <ProtectedRoute>
        <JobSetup />
      </ProtectedRoute>
    ),
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>

  )
}

export default App