import React, { useState } from "react";
import useLogin from "./useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basit doğrulama
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    login(email, password);
  };

  return (
    <div className="flex flex-col md:flex-row w-[800px] h-[450px] mx-auto my-12 shadow-2xl rounded-2xl overflow-hidden bg-gray-100">
      {/* Form Alanı */}
      <div className="w-full md:w-[400px] h-full bg-white flex items-center p-8 rounded-t-2xl md:rounded-t-none md:rounded-l-2xl">
        <div className="w-full max-w-sm mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Giriş Yap
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-600 bg-red-100 px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>

      {/* Görsel Alanı */}
      <div className="hidden md:block w-[400px] h-full">
        <img
          src="/assets/images/form-image.jpg"
          alt="Form Side"
          className="w-full h-full object-cover rounded-r-2xl"
        />
      </div>
    </div>
  );
};

export default LoginForm;
