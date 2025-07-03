import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  // Sayfa yüklendiğinde localStorage'dan email ve role bilgilerini al
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedRole = localStorage.getItem("role");

    if (savedEmail) setEmail(savedEmail);
    if (savedRole) setRole(savedRole);
  }, []);

  const loginUser = ({ email, role }) => {
    setEmail(email);
    setRole(role);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
  };

  const logoutUser = () => {
    setEmail(null);
    setRole(null);
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ email, role, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
