import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  // Sayfa ilk yüklendiğinde localStorage'dan bilgileri al
  useEffect(() => {
    const savedId = localStorage.getItem("userId");
    const savedEmail = localStorage.getItem("email");
    const savedRole = localStorage.getItem("role");

    if (savedId) setId(savedId);
    if (savedEmail) setEmail(savedEmail);
    if (savedRole) setRole(savedRole);
  }, []);

  // Kullanıcı giriş işlemi
  const loginUser = ({ id, email, role }) => {
    setId(id);
    setEmail(email);
    setRole(role);
    localStorage.setItem("userId", id);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
  };

  // Kullanıcı çıkış işlemi
  const logoutUser = () => {
    setId(null);
    setEmail(null);
    setRole(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ id, email, role, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
