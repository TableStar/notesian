import { type RecordModel } from "pocketbase";
import React, { createContext, useContext, useEffect, useState } from "react";
import { pb } from "~/lib/pocketbase";

type AuthContextType = {
  user: RecordModel | null;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<RecordModel | null>(pb.authStore.model);

  useEffect(() => {
    const unsub = pb.authStore.onChange((token, model) => {
      setUser(model);
    }, true);

    return () => {
      unsub();
    };
  }, []);

  const value = {
    user,
    isLoggedIn: !!user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
