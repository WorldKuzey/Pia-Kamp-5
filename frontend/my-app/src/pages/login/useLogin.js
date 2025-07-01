// src/pages/login/useLogin.js

import { useNavigate } from "react-router-dom";
import { fakeUsers } from "../../data/users"; // kullanıcı verileri

const useLogin = () => {
  const navigate = useNavigate();

  const login = (email, password) => {
    const foundUser = fakeUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      alert("Geçersiz e-posta veya şifre!");
      return;
    }

    // Giriş başarılı → rolü kaydet
    localStorage.setItem("role", foundUser.role);

    // Role göre yönlendir
    if (foundUser.role === "hr") {
      navigate("/hr/dashboard");
      console.log(foundUser.role);
    } else {
      navigate("/employee/dashboard");
    }
  };

  return { login };
};

export default useLogin;
