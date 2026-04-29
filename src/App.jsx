import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Score from "./pages/Score";
import Subscription from "./pages/Subscription";
import Charity from "./pages/Charity";
import Winners from "./pages/Winners";
import Navbar from "./pages/Navbar";
import Homepage from "./pages/Homepage";

// 🔥 Wrapper to control Navbar
function Layout() {
  const location = useLocation();

  // ❌ hide navbar on public pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* 🌐 Public */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 Private */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/score" element={<Score />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/charity" element={<Charity />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;