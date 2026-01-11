import React from "react";
import { useAuthStore } from "@/utils/store/authStore";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth, setAuth, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const registerMutate = async (credentials: {
    email: string;
    password: string;
  }) => {
    // register API
    console.log("Registering user with credentials:", credentials);
    return fetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.status === 403) {
          alert("Registration failed. user may already exist.");
        } else if (!response.ok) {
          throw new Error("Registration failed");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        throw error;
      });
  };

  const loginMutate = async (credentials: {
    email: string;
    password: string;
  }) => {
    // getToken API
    return fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Login failed. Check your credentials.");
          throw new Error("Login failed");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        return data;
      });
  };

  const login = async (email: string, password: string) => {
    const response = await loginMutate({
      email,
      password,
    });

    setAuth({
      email: email,
      token: response.token,
    });
    if (response.token) {
      navigate("/dashboard");
    }
  };

  const register = async (email: string, password: string) => {
    const response = await registerMutate({
      email,
      password,
    });

    setAuth({
      email: email,
      token: response.token,
    });
    if (response.token) {
      navigate("/dashboard");
    }
  };

  const logout = async () => {
    clearAuth();
  };

  const value = {
    auth,
    setAuth,
    login,
    logout,
    checkAuth: async () => Promise.resolve(),
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
