import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import { getCurrentUser } from "./utils/auth";

// Pages
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import DonationSuccess from "./pages/DonationSuccess";
import Contact from "./pages/Contact";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import DonationHistory from "./pages/DonationHistory";
import CreateEmergencyRequest from "./pages/CreateEmergencyRequest";
import EmergencyRequests from "./pages/EmergencyRequests";
import EmergencyRequestDetails from "./pages/EmergencyRequestDetails";

import AdminDashboard from "./components/admin/AdminDashboard";

const App = () => {

  const currentUser = getCurrentUser();

  return (
    <>

      <Navbar />

      <Routes>

        {/* Public */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* Protected */}

        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <Campaigns />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <Donate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer"
          element={
            <ProtectedRoute>
              <Volunteer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-emergency-request"
          element={
            <ProtectedRoute>
              <CreateEmergencyRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/emergency-requests"
          element={<EmergencyRequests />}
        />

        <Route
          path="/emergency-request/:id"
          element={<EmergencyRequestDetails />}
        />

        <Route
          path="/donation-success"
          element={
            <ProtectedRoute>
              <DonationSuccess />
            </ProtectedRoute>
          }
        />

        {/* Donor Only */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              {
                currentUser?.role === "admin"
                  ? (
                      <Navigate
                        to="/admin"
                        replace
                      />
                    )
                  : (
                      <Profile />
                    )
              }
            </ProtectedRoute>
          }
        />

        <Route
          path="/donations"
          element={
            <ProtectedRoute>
              {
                currentUser?.role === "admin"
                  ? (
                      <Navigate
                        to="/admin"
                        replace
                      />
                    )
                  : (
                      <DonationHistory />
                    )
              }
            </ProtectedRoute>
          }
        />

        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Admin */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#2E332B",
            color: "#fff",
          },
        }}
      />

      <Footer />

    </>
  );
};

export default App;
