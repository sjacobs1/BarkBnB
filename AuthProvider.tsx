import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { useUserStore } from "./hooks/UserStore";
import { getLatestToken } from "./utils/tokenUtils";

export type UserType = "user" | "admin" | null;

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const ADMIN_UIDS = ["LlowqXkGoOPfY3mYGM0eVmWooDA3"];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        const idToken = await getLatestToken();

        console.log("Saved token:", idToken);

        let role;
        if (ADMIN_UIDS.includes(currentUser.uid)) {
          role = "admin";
        } else if (userSnapshot.exists()) {
          role = userSnapshot.data()?.role || "user";
        }

        const userData = userSnapshot.data();
        setUser({
          id: currentUser.uid,
          firstName: userData?.firstName || "",
          lastName: userData?.lastName || "",
          cellNumber: userData?.cellNumber || "",
          email: currentUser.email || "",
          role,
        });
      } else {
        clearUser();
      }
    });

    return unsubscribe;
  }, [setUser, clearUser]);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    console.log("User ID:", uid);

    const userReference = doc(db, "users", uid);
    const userSnapshot = await getDoc(userReference);

    let role = "user";
    if (ADMIN_UIDS.includes(uid)) {
      role = "admin";
    } else if (userSnapshot.exists()) {
      role = userSnapshot.data()?.role || "user";
    }

    const userData = userSnapshot.data();
    setUser({
      id: uid,
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      cellNumber: userData?.cellNumber || "",
      email: userCredential.user.email || "",
      role,
    });
  };

  const logout = async () => {
    await signOut(auth);
    clearUser();
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
