import { createContext, useContext, useState, useEffect } from "react";
import { GetUserData } from "../requests/User/GetUser";
import { SetHeaderToken } from "../api";

type Props = {
  children: React.ReactNode;
};

export interface UserContextType {
  user: GetUserData | undefined;
  setUser: React.Dispatch<React.SetStateAction<GetUserData | undefined>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<GetUserData>();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    console.log('Estado do usuário mudou:', user);
  }, [user]);

  useEffect(() => {
    console.log('Estado de isSignedIn mudou:', isSignedIn);
  }, [isSignedIn]);

  useEffect(() => {
    console.log('Estado de isAdmin mudou:', isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    console.log('Token atualizado:', token);
    SetHeaderToken(token)
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isSignedIn,
        setIsSignedIn,
        isAdmin,
        setIsAdmin,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext) as UserContextType;
  return context;
}

export { AuthProvider, useAuth };
