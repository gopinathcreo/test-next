"use client";
import { Button, Checkbox } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  getAuth,
} from "firebase/auth";
import { app } from "@/src/providers/firebase_provider";
import { useCart } from "../providers/cart_context";
import { loginUser } from "../providers/api_provider";
import { LocalStorageProvider } from "../providers/local_storage_provider";

interface LoginFormProps {
  login?: () => void;
}

const LoginForm = ({ login }: LoginFormProps) => {
  const [phone_number, setNumber] = useState("");

    const [otp, setOtp] = useState("");
    const [otp_sent, setOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {setCurrentStep, setIsLoggedIn, getAddressList} = useCart();
    let auth = getAuth(app);
    const otpRef = React.useRef<HTMLInputElement>(null);

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const [appVerifier, setAppVerifier] = useState<RecaptchaVerifier>();

  useEffect(() => {
    if (appVerifier == undefined) {
      setAppVerifier(
        new RecaptchaVerifier(auth, "sign-in-button", {
          size: "invisible",
          callback: (response: any) => {
          },
        })
      );
    }
  });

  useEffect(() => {
    otpRef.current?.focus();
  }, [otp_sent]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (phone_number != "" && !otp_sent) {
      setIsLoading(true);
      signInWithPhoneNumber(auth, "+91" + phone_number, appVerifier!)
        .then((result) => {
          setIsLoading(false);
          setOtpSent(true);
          setConfirmationResult(result);
          // ...
        })
        .catch((error) => {
          console.log(error);
          // Error; SMS not sent
          // ...
        });
    }
  };

  const verifyOtp = (event: any) => {
    event.preventDefault();
    if (otp != "" && otp_sent) {
      setIsLoading(true);
      confirmationResult
        ?.confirm(otp)
        .then(async (result) => {
          // User signed in successfully.
          let token = await result?.user?.getIdToken();
          if (token) {
            let response = await loginUser(token);

            setIsLoading(false);
            if (response.status) {
              LocalStorageProvider.setToken(response.data?.token);
              setIsLoggedIn(true);
                            setCurrentStep(2);
              getAddressList();
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#eaddff] p-3 rounded-t-lg">
        <div className="text-sm font-medium text-[#2f1500]">LOGIN</div>
        <div className="text-sm text-[#1a1c1e] mt-2">
          Please login to proceed to cart
        </div>
      </div>
      {!otp_sent ? (
        <div className="w-full rounded-b-lg bg-white px-3 py-5 border border-gray-300">
          <form onSubmit={onSubmit}>
            <div className="flex items-center mb-4">
              <span className="text-black border bg-gradient-login-input border-[#b5b5b8] rounded-l-full py-2 px-3 border-r">
                +91
              </span>
              <input
                type="mobile"
                id="mobile"
                value={phone_number}
                onChange={(e) => setNumber(e.currentTarget.value)}
                className="pl-2 py-2 border bg-gradient-login-input border-[#b5b5b8] rounded-r-full px-3 outline-none  w-full"
              />
            </div>

            <div className="flex items-start mb-4">
              <Checkbox
                  defaultChecked
                crossOrigin=""
                name=""
                ripple={false}
                className="h-5 w-5 rounded-md  checked:bg-[#6A4FA1] transition-all hover:scale-105 hover:before:opacity-0"
                label={
                  <label
                    htmlFor="terms"
                    className="text-xs items-start text-[#1a1c1e]"
                  >
                    I accept the{" "}
                    <a href="#" className="underline">
                      Terms & Conditions
                    </a>
                    ,{" "}
                    <a href="#" className="underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline">
                      End User License Agreement
                    </a>
                  </label>
                }
                onPointerEnterCapture
                onPointerLeaveCapture
              />
            </div>

            <Button
                type="submit"
              id="sign-in-button"
              className="w-full py-2 px-4 bg-[#6a4fa3] my-10 rounded-full text-white text-sm !font-normal"
              placeholder=""
              onPointerEnterCapture
              onPointerLeaveCapture
            >
              {isLoading ? (
                <div
                  className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                "GET OTP"
              )}
            </Button>
          </form>
        </div>
      ) : (
        <div className="w-full rounded-b-lg bg-white px-3 py-5 border border-gray-300">
          <form>
            <div className="text-sm pb-3 pt-5">{`We have sent you an SMS with a code to +91${phone_number}`}</div>
            <div className="flex items-center mb-4">
              <input
                type="number"
                ref={otpRef}
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.currentTarget.value)}
                placeholder={"Enter OTP"}
                maxLength={6}
                className="pl-2 py-2 border bg-gradient-login-input border-[#b5b5b8] rounded-full px-3 outline-none  w-full"
              />
            </div>

            <Button
              onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
              onClick={verifyOtp}
              type="submit"
              className="w-full py-2 px-4 bg-[#6a4fa3] my-10 rounded-full text-white text-sm !font-normal"
              placeholder=""
            >
              {isLoading ? (
                <div
                  className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
