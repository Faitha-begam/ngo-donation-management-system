import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";


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


import AdminDashboard from "./components/admin/AdminDashboard";

const App = () => {

  return (

    <>

      <Navbar />


      <Routes>


        {/* Public Page */}

        <Route
          path="/"
          element={<Home />}
        />



        {/* Protected Pages */}


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



        {/* Donation success should also be protected */}

        <Route
          path="/donation-success"
          element={
            <ProtectedRoute>
              <DonationSuccess />
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
  path="/donations"
  element={<DonationHistory />}
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

 
    <Route
  path="/admin"
  element={
    <AdminRoute >
      <AdminDashboard />
    </AdminRoute>
  }
/>

      </Routes>

      <Toaster
  position="top-right"
  toastOptions={{
    duration:3000,
    style:{
      borderRadius:"12px",
      background:"#2E332B",
      color:"#fff"
    }
  }}
/>

      <Footer />


    </>

  );

};


export default App;