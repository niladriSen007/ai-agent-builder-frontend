import { LoginForm } from "@/components/login-form";
import { signInWithPopup } from "firebase/auth";
import { firebase_auth, google_provider } from "../firebase_config";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {

  const { mutate } = useLogin();

  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithPopup(firebase_auth, google_provider);
      const googleToken = await data?.user?.getIdTokenResult();
      mutate({ token: googleToken?.token });
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dark flex min-h-svh w-full items-center justify-center bg-linear-to-b from-black to-slate-950 p-6 text-foreground md:p-10">
      <div className="w-full max-w-[22rem]">
        <div className="mb-6 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
          <span>AI Agent Builder</span>
        </div>
        <LoginForm onClick={handleGoogleLogin} />
      </div>
    </div>
  );
};
export default LoginPage;
