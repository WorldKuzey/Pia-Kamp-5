import { useState } from "react";
import axios from "axios";

const useAddEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addEmp = async (employeeData, imageFile) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append(
        "employee",
        new Blob([JSON.stringify(employeeData)], {
          type: "application/json",
        })
      );

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axios.post(
        "http://localhost:5000/api/employees/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addEmp, loading, error, success };
};

export default useAddEmployee;
