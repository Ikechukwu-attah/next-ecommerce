"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import Cookies from "js-cookie";

import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

enum Mode {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const [mode, setMode] = useState(Mode.LOGIN);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const formTitle =
    mode === Mode.LOGIN
      ? "Login"
      : mode === Mode.REGISTER
      ? "Register"
      : mode === Mode.RESET_PASSWORD
      ? "Reset Your Password"
      : "Verify Your Email";

  const buttonTitle =
    mode === Mode.LOGIN
      ? "Login"
      : mode === Mode.REGISTER
      ? "Register"
      : mode === Mode.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const wixClient = useWixClient();
  const pathname = usePathname();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router, isLoggedIn]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      let res;
      switch (mode) {
        case "LOGIN":
          res = await wixClient.auth.login({ email, password });
          break;
        case "REGISTER":
          res = await wixClient.auth.register({
            password,
            email,
            profile: { nickname: username },
          });
          break;
        case "RESET_PASSWORD":
          res = await wixClient.auth.sendPasswordResetEmail(pathname, email);
          setMessage("Check your email for a link to reset your password");
          break;
        case "EMAIL_VERIFICATION":
          res = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          throw new Error("Invalid mode");
      }

      switch (res?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful! You are being redirected");

          const sessionToken = res?.data?.sessionToken;
          if (!sessionToken) {
            throw new Error("Session token is missing");
          }

          try {
            const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
              sessionToken
            );

            console.log("Tokens received:", tokens);

            Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
              expires: 2,
            });

            wixClient.auth.setTokens(tokens);

            console.log("Tokens set and cookies updated");

            setTimeout(() => {
              if (wixClient.auth.loggedIn()) {
                router.push("/");
              }
            }, 1000);
          } catch (error) {
            console.error("Error while handling tokens and redirect:", error);
            setMessage("An error occurred during login. Please try again.");
          }
          break;

        case LoginState.FAILURE:
          if (
            res.errorCode === "invalidEmail" ||
            res.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password!");
          } else if (res.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (res.errorCode === "resetPassword") {
            setError("Reset password failed. Please try again.");
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
          break;
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(Mode.EMAIL_VERIFICATION);
          break;
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Please wait for the owner to approve your account");
          break;
        default:
          setError("An unexpected error occurred. Please try again.");
          break;
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center relative ">
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col gap-8 w-full max-w-[400px] "
      >
        <h1 className="text-2xl font-semibold"> {formTitle}</h1>
        {mode === Mode.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700" htmlFor="email">
              Username
            </label>
            <input
              className="ring-2 ring-gray-300 rounded-md p-4"
              type="text"
              placeholder="James"
              value={username || ""}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : null}

        {mode !== Mode.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="ring-2 ring-gray-300 rounded-md p-4"
              name="email"
              type="email"
              placeholder="james@gmail.com"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700" htmlFor="email">
              Verification Code
            </label>
            <input
              className="ring-2 ring-gray-300 rounded-md p-4"
              name="emailCode"
              type="text"
              placeholder="Code"
              value={emailCode || ""}
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}
        {mode === Mode.LOGIN || mode === Mode.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="ring-2 ring-gray-300 rounded-md p-4"
              name="password"
              type="password"
              placeholder="********"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}
        {mode === Mode.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(Mode.RESET_PASSWORD)}
          >
            Forgot Password
          </div>
        )}
        <button
          className="bg-primary text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed }"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {mode === Mode.LOGIN && (
          <div
            onClick={() => setMode(Mode.REGISTER)}
            className=" text-sm underline cursor-pointer"
          >
            {"Don't"} have an account?
          </div>
        )}

        {mode === Mode.REGISTER && (
          <div
            onClick={() => setMode(Mode.LOGIN)}
            className="text-sm underline cursor-pointer"
          >
            have an account?
          </div>
        )}

        {mode === Mode.RESET_PASSWORD && (
          <div
            onClick={() => setMode(Mode.LOGIN)}
            className="text-sm underline cursor-pointer"
          >
            Go back to Login
          </div>
        )}

        {message && <p className="text-green-600 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
