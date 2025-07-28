import { useAuth } from "./contexts/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
      {/* <Route path="/" element={<Dashboard />} /> */}
    </Routes>
  );
};

export default App;
