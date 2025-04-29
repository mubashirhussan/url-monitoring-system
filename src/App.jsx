import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/Layout";
import Index from "./pages/admin/Index";
import Login from "./components/Login";
import Register from "./pages/auth/registration/Index";
import Forgot from "./pages/auth/forgotPassword/Index";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />

        {/* Protected/Admin Routes wrapped in Layout */}
        <Route element={<AppLayout />}>
          <Route path="/admin-dashboard" element={<Index />} />
          {/* add more protected routes here inside layout if needed */}
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<h3>Page not found</h3>} />
      </Routes>
    </>
  );
}

export default App;
