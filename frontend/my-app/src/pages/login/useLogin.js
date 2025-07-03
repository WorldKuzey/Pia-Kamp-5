import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const useLogin = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const login = async (email, password) => {
    try {
      const res = await axios.post("api/employees/login", {
        email,
        password,
      });
      const user = res.data; // { name, email, role }
      loginUser(user); // context'e set et

      navigate(user.role === "HR" ? "/hr/mainpage" : "/employee/mainpage");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return { login };
};

export default useLogin;
