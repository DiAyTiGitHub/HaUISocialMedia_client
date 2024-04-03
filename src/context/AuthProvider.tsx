import { IUser } from "@/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

type AuthContext = {
  currentUser: IUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isAuthenticated: boolean;
};
const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: false,
  setCurrentUser: () => {},
};

const AuthContext = createContext<AuthContext>(INITIAL_STATE);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isAuthenticated] = useState<boolean>(() =>
    localStorage.getItem("token") ? true : false
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === "[]" || token === null || token === undefined)
      navigate("/login");

    if (token) {
      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage !== null) {
        setCurrentUser(JSON.parse(userFromLocalStorage) as IUser);
      }
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    isAuthenticated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be use with AuthContext");
  }
  return context;
};
