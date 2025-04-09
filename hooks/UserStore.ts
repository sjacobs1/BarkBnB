import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  cellNumber: string;
  email: string;
  role: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: () => Promise<User | null>;
  updateUser: (user: User) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  devtools((set, get) => ({
    user: null,

    setUser: (user: User) => set({ user }),

    clearUser: () => set({ user: null }),

    fetchUser: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return null;

      const userReference = doc(db, "users", currentUser.uid);
      const userSnapshot = await getDoc(userReference);
      if (!userSnapshot.exists()) return null;

      const userData = userSnapshot.data();
      const user = {
        id: currentUser.uid,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        cellNumber: userData.cellNumber || "",
        email: userData.email,
        role: userData.role,
      };
      console.log("Fetched user:", user);

      set({ user });
      return get().user;
    },

    updateUser: async (user: User) => {
      await setDoc(doc(db, "users", user.id), user);
      set({ user });
    },
  }))
);
