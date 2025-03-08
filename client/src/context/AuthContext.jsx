import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi, register as registerApi } from "../api/authApi";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && role) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [token, role]);

  const register = async (userData) => {
    try {
      const { token, role } = await registerApi(userData);
      setToken(token);
      setRole(role);
      setUser({ role });
      redirectToDashboard(role);
    } catch (err) {
      console.error("Registration failed:", err);

      throw err;
    }
  };

  const login = async (userData) => {
    try {
      const { token, role } = await loginApi(userData);
      setToken(token);
      setRole(role);
      setUser({ role });

      redirectToDashboard(role);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    navigate("/login");
  };

  const redirectToDashboard = (userRole) => {
    switch (userRole) {
      case "House Officer":
        navigate("/house-officer-dashboard");
        break;
      case "Medical Officer":
        navigate("/medical-officer-dashboard");
        break;
      case "Nurse":
        navigate("/nurse-dashboard");
        break;
      case "Consultant":
        navigate("/consultant-dashboard");
        break;
      default:
        navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, role, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
