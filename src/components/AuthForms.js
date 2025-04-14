"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

export default function AuthForms({ isLogin = true }) {
  const { login, signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData);
      }
      // Removed router.push("/dashboard") as it's now handled in useAuth
    } catch (err) {
      setError(err.message);
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-400">
          {isLogin
            ? "Enter your credentials to access your account"
            : "Join us and start practicing for your dream job"}
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-300"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required={!isLogin}
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 focus:border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-300"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required={!isLogin}
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 focus:border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
              />
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 focus:border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 focus:border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
        </button>
      </form>
    </div>
  );
}
