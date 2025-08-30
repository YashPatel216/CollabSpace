import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { createContext, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          if (
            error.message?.includes("auth") ||
            error.message?.includes("token")
          ) {
            toast.error("Authentication issue, please try again");
          }
          console.log("Error", error);
        }
        return config;
      },
      (error) => {
        console.log("Axios Request Error", error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}
