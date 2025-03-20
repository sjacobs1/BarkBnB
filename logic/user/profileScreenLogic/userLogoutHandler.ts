import { useRouter } from "expo-router";
import { useAuth } from "../../../AuthProvider";
import { useUserStore } from "../../../hooks/UserStore";

function userLogoutHandler() {
  const { logout } = useAuth();
  const { user } = useUserStore();
  console.log("Role:", user?.role);
  const router = useRouter();

  const navigateLogin = () => {
    router.push("/(auth)/login");
  };

  const userSignOut = async () => {
    await logout();
    navigateLogin();
  };

  return { userSignOut };
}

export default userLogoutHandler;
