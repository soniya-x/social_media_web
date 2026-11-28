import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

interface GoogleLoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    profileImage: string;
  };
}

const GoogleLoginButton = () => {

      const router = useRouter();
    
  const handleGoogleSuccess = async (
    response: CredentialResponse,
  ): Promise<void> => {
    try {
      if (!response.credential) {
        throw new Error("Google credential not received");
      }

      const result = await axios.post<GoogleLoginResponse>(
        process.env.NEXT_PUBLIC_API_URL + "/users/google",
        {
          credential: response.credential,
        },
      );

      console.log("Logged in user:", result.data.user);
      console.log("JWT Token:", result.data.token);

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

       router.push("/home");

      // TODO: Store user in auth context/state.
      // Prefer HTTP-only cookies for production JWT storage.

      // } catch (error: unknown) {
      //   if (axios.isAxiosError(error)) {
      //     console.error(
      //       error.response?.data?.message || error.message
      //     );
      //   } else if (error instanceof Error) {
      //     console.error(error.message);
      //   } else {
      //     console.error("Something went wrong");
      //   }
      // }
    } catch (error: unknown) {
      console.log("error ===>", error);
      if (axios.isAxiosError<{ message?: string }>(error)) {
        console.error(error.response?.data?.message ?? error.message);
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Something went wrong");
      }
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => console.log("Google Login Failed")}
      theme="outline"
      size="large"
      shape="rectangular"
      text="continue_with"
    />
  );
};

export default GoogleLoginButton;
