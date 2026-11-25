import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, isFirebaseConfigured } from "../firebase/config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      const demoAdmin = localStorage.getItem("demo_admin_logged_in");
      if (demoAdmin === "true") {
        setUser({ email: "admin@portfolio.uz", isDemo: true });
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    if (!isFirebaseConfigured) {
      localStorage.setItem("demo_admin_logged_in", "true");
      setUser({ email: email || "admin@portfolio.uz", isDemo: true });
      return;
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!isFirebaseConfigured) {
      localStorage.removeItem("demo_admin_logged_in");
      setUser(null);
      return;
    }
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isFirebaseConfigured }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
