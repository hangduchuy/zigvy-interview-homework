import { useAuth } from "./contexts/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />

        {/* <Route path="/" element={<Dashboard />} /> */}
      </Routes>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />
    </>
  );
};

export default App;
