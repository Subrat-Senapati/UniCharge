import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/profile`, {
        method: "GET",
        credentials: "include",
      });
      console.log("Profile status:", res.status);

      // If Unauthorized, redirect to login
      // if (res.status === 401) {
      //   setUser(null);
      //   navigate("/login");
      //   return;
      // }

      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      setUser(data.user);
      console.log("Fetched profile:", data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        fetchProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);