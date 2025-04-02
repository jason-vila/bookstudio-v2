import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LibraryBig } from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Users = lazy(() => import("../pages/dashboard/Users"));
const Books = lazy(() => import("../pages/dashboard/Books"));
const Authors = lazy(() => import("../pages/dashboard/Authors"));
const Courses = lazy(() => import("../pages/dashboard/Courses"));
const Loans = lazy(() => import("../pages/dashboard/Loans"));
const Publishers = lazy(() => import("../pages/dashboard/Publishers"));
const Students = lazy(() => import("../pages/dashboard/Students"));
const Profile = lazy(() => import("../pages/dashboard/Profile"));
const Login = lazy(() => import("../pages/auth/Login"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="bg-primary text-primary-foreground flex aspect-square h-16 w-16 items-center justify-center rounded-2xl animate-pulse">
        <LibraryBig className="h-10 w-10" />
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="loans" element={<Loans />} />
            <Route path="books" element={<Books />} />
            <Route path="authors" element={<Authors />} />
            <Route path="publishers" element={<Publishers />} />
            <Route path="courses" element={<Courses />} />
            <Route path="students" element={<Students />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
