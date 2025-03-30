import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: any;
  isSignedIn: boolean;
};

const AuthContext = createContext<UserContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ user, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
