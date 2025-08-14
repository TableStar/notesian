import { pb } from "~/lib/pocketbase";
import type { LoginForm } from "~/types/types";

const loginWithPass = async (data: LoginForm) => {
  try {
    const authRes = await pb
      .collection("users")
      .authWithPassword(data.email, data.password);

    return { success: true, user: authRes.record };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

const loginWithGoogle = async () => {
  try {
    const authRes = await pb
      .collection("users")
      .authWithOAuth2({ provider: "google" });
    console.log("LOGGED IN", authRes);
    return { success: true, user: authRes.record };
  } catch (error: any) {
    if (error?.response?.message === "Failed to create record.") {
      return {
        success: false,
        error:
          "Sign-ups via Google are currently disabled. Please use an account that has already been created.",
      };
    }
    console.error("Failed to log in with Google:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};

const logout = () => {
  pb.authStore.clear();
};

export const authService = {
  loginWithPass,
  loginWithGoogle,
  logout,
};
