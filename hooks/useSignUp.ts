import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAddUserMutation } from "../app/services/user/userSlice";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const ADMIN_UIDS = ["LlowqXkGoOPfY3mYGM0eVmWooDA3"];
export const useSignUp = () => {
  console.log("useSignUp hook initialized");
  const [addUser] = useAddUserMutation();

  const signUp = async (
    firstName: string,
    lastName: string,
    cellNumber: string,
    email: string,
    password: string,
    role: string
  ) => {
    console.log("signUp function called");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Firebase user created:", userCredential.user.uid); // Debug log
    const uid = userCredential.user.uid;
    const userRole = ADMIN_UIDS.includes(uid) ? "admin" : role;

    const user = {
      firstName,
      lastName,
      cellNumber,
      email,
      role: userRole,
    };

    await setDoc(doc(db, "users", uid), {
      id: uid,
      firstName,
      lastName,
      cellNumber,
      email,
      role: userRole,
    });
    console.log("User saved to Firestore");

    try {
      await addUser(user).unwrap();
      console.log("User added to PostgreSQL");
    } catch (error) {
      console.error("Error adding user to PostgreSQL:", error);
      throw new Error("Failed to add user to PostgreSQL");
    }

    return userCredential;
  };

  return { signUp };
};
