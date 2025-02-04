import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export type UserType = "user" | "admin" | null;

interface AuthContextType {
  user: User | null;
  role: UserType | string;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: UserType) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const ADMIN_UIDS = ["LlowqXkGoOPfY3mYGM0eVmWooDA3"];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserType>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        if (ADMIN_UIDS.includes(currentUser.uid)) {
          setRole("admin");
        } else {
          const roleDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (roleDoc.exists()) {
            setRole(roleDoc.data().role);
          } else {
            setRole("user");
          }
        }
      } else {
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    if (ADMIN_UIDS.includes(uid)) {
      setRole("admin");
    } else {
      const roleDoc = await getDoc(doc(db, "users", uid));
      if (roleDoc.exists()) {
        setRole(roleDoc.data().role);
      } else {
        setRole("user");
      }
    }
  };

  const signup = async (email: string, password: string, role: UserType) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    const userRole = ADMIN_UIDS.includes(uid) ? "admin" : role;

    await setDoc(doc(db, "users", uid), { role: userRole });
    setRole(userRole);
  };

  const logout = async () => {
    await signOut(auth);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
