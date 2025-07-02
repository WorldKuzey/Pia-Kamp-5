import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // Uygulama açıldığında sadece role’i localStorage’tan al
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  const loginUser = (userData) => {
    setUser(userData); // sadece context'e
    setRole(userData.role);
    localStorage.setItem("role", userData.role); // sadece role yaz
  };

  const logoutUser = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("role"); // sadece role sil
  };

  return (
    <AuthContext.Provider value={{ user, role, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
