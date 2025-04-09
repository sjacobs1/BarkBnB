import * as SecureStore from "expo-secure-store";
import { auth } from "../firebaseConfig";

async function saveToken(idToken: string) {
  await SecureStore.setItemAsync("idToken", idToken);
}

export const getLatestToken = async (): Promise<string | null> => {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  const idToken = await user.getIdToken(true);
  await saveToken(idToken);
  return idToken;
};
