import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/types";

export const INITIAL_USER = {
  id: "",
  fullname: "",
  phone: "",
  username: "",
  avatar: "",
  gender: "",
  class: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  setUser: () => {},
};

type IContextType = {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // check cookie => existing account?
    if (!user.id) navigate("/login");

    // set current userhere
  }, []);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
