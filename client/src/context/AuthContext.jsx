import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL
axios.defaults.baseURL = API_URL

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      setUser(parsed);
      axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
        phone,
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    delete axios.defaults.headers.common["Authorization"];
  };

  const updateUser = async (userData) => {
    try {
      const { data } = await axios.put("/api/users/me", userData);
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Update failed";
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put("/api/users/change-password", {
        currentPassword,
        newPassword,
      });
      return { success: true, message: "Password changed successfully" };
    } catch (error) {
      throw error.response?.data?.message || "Password change failed";
    }
  };

  const forgotPassword = async (email) => {
    try {
      const { data } = await axios.post("/api/users/forgot-password", {
        email,
      });
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Forgot password failed";
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const { data } = await axios.post("/api/users/reset-password", {
        token,
        newPassword,
      });
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Reset password failed";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        changePassword,
        forgotPassword,
        resetPassword,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
