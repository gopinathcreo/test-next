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
import { fetchUserDetails, loginUser } from "../providers/api_provider";
import { LocalStorageProvider } from "../providers/local_storage_provider";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Script from "next/script";

const mobileSchema = z.object({
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must not exceed 10 digits"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "Enter valid OTP").max(6, "Enter valid OTP"),
});

interface LoginFormProps {
  login?: () => void;
  onClose?: () => void;
  page?: string;
  onSuccess?: () => void;
  redirectTo?: () => void;
}

const LoginMain = ({
  login,
  onClose,
  page,
  onSuccess,
  redirectTo,
}: LoginFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [otp, setOtp] = useState("");
  const [otp_sent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showChecked, setChecked] = useState(true);
  const { setCurrentStep, setIsLoggedIn, getAddressList, setUserDetail } =
    useCart();
  let auth = getAuth(app);
  let [resendTimeout, setResendTimeout] = useState(0);

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const [appVerifier, setAppVerifier] = useState<RecaptchaVerifier>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(mobileSchema),
  });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorsOtp },
    setError,
    clearErrors,
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (appVerifier == undefined) {
      setAppVerifier(
        new RecaptchaVerifier(auth, "sign-in-button", {
          size: "invisible",
          callback: (response: any) => {},
        })
      );
    }
  }, []);

  useEffect(() => {
    if (resendTimeout >= 1) {
      setTimeout(() => {
        if (resendTimeout >= 1) {
          setResendTimeout(resendTimeout - 1);
        }
      }, 1000);
    }
  }, [resendTimeout]);

  function startTimer() {
    setResendTimeout(60);
  }

  const onSubmit = (data: any) => {
    console.log(data, errors);

    if (data.mobile != "" && !otp_sent) {
      setIsLoading(true);
      setPhoneNumber(data.mobile);
      signInWithPhoneNumber(auth, "+91" + data.mobile, appVerifier!)
        .then((result) => {
          setIsLoading(false);
          setOtpSent(true);

          setConfirmationResult(result);
          startTimer();
        })
        .catch((error) => {
          console.log(error);
          // Error; SMS not sent
          // ...
        });
    }
  };

  const verifyOtp = (data: any) => {
    if (data.otp != "" && otp_sent) {
      setIsLoading(true);
      confirmationResult
        ?.confirm(data.otp)
        .then(async (result) => {
          // User signed in successfully.
          let token = await result?.user?.getIdToken();
          if (token) {
            let response = await loginUser(token);

            setIsLoading(false);
            if (onClose) {
              onClose();
            }
            if (response.status) {
              LocalStorageProvider.setToken(response.data?.token);
              setIsLoggedIn(true);
              LocalStorageProvider.setUserMobile(phoneNumber);
              if (page == "zenClub") {
                if (onSuccess) {
                  onSuccess();
                  if (redirectTo) {
                    redirectTo();
                  }
                }
              }
              setCurrentStep(2);
              getAddressList();
              const userDetails = await fetchUserDetails();
              if (userDetails.data && userDetails.data?.id) {
                setUserDetail(userDetails.data);
              }
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setError("otp", {
            type: "manual",
            message: "Enter valid OTP",
          });
          setTimeout(() => {
            clearErrors("otp");
            reset();
          }, 2000);
        });
    }
  };

  const resendOtp = (event: any) => {
    event.preventDefault();
    console.log("called", resendTimeout);
    setIsLoading(true);
    signInWithPhoneNumber(auth, "+91" + phoneNumber, appVerifier!)
      .then((result) => {
        setOtpSent(true);
        setConfirmationResult(result);
        setIsLoading(false);
        startTimer();
      })

      .catch((error) => {
        console.error("Error sending OTP:", error);
        setIsLoading(false);
      });
  };

  const handleFocus = (): void => {
    const element = document.getElementById("otp");
    if (element instanceof HTMLElement) {
      // Type assertion for TypeScript
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCB-TQU_FymDSSEkg6DBArbORKW4S8Syt8&libraries=places`}
        async={true}
        defer={true}
      ></Script>
      <div className="flex flex-col w-full">
        {page != "cartLogin" && (
          <div
            className={`bg-white py-4  px-4 flex justify-between  w-full text-black rounded-t-md`}
          >
            <div className="block">
              <h2 className="text-[16px] font-normal">LOGIN</h2>
              <p className="py-2 text-[16px] font-normal">
                Please login to Proceed
              </p>
            </div>
            <svg
              onClick={onClose}
              className="h-6 w-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>{" "}
          </div>
        )}

        {page === "cartLogin" && (
          <div className="bg-[#eaddff] p-3 rounded-t-lg">
            <div className="text-sm font-medium text-[#2f1500]">LOGIN</div>
            <div className="text-sm text-[#1a1c1e] mt-2">
              Please login to proceed to cart
            </div>
          </div>
        )}
        <div className="flex justify-center">
          {!otp_sent ? (
            <div
              className={`w-[450px] rounded-b-lg bg-white px-3 py-5 ${
                page === "cartLogin" ? "border border-gray-300" : ""
              }`}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-4">
                  <div className="flex items-center ">
                    <span
                      className={`text-[#677788] border bg-gradient-login-input  rounded-l-full py-2 px-3  ${
                        !!errors.mobile
                          ? "border-red-500"
                          : "border-[#b5b5b8] border-r"
                      }`}
                    >
                      +91
                    </span>
                    <input
                      type="tel"
                      id="mobile"
                      {...register("mobile", { required: true })}
                      //value={phone_number}
                      //onChange={(e) => setNumber(e.currentTarget.value)}
                      className={`pl-2 py-2 border bg-gradient-login-input rounded-r-full px-3 outline-none  w-full text-black ${
                        !!errors.mobile ? "border-red-500" : "border-[#b5b5b8] "
                      }`}
                    />
                  </div>
                  <span className="text-xs text-red-500 ml-4">
                    {errors.mobile?.message?.toString()}
                  </span>
                </div>

                <div className="flex items-start ">
                  <Checkbox
                    onChange={() => setChecked(!showChecked)}
                    defaultChecked
                    crossOrigin=""
                    name=""
                    ripple={false}
                    className="h-4 w-4 rounded-[4px]  checked:bg-[#6A4FA1] transition-all hover:scale-105 hover:before:opacity-0 "
                    label={
                      <label
                        htmlFor="terms"
                        className="text-xs items-start text-[#1a1c1e]"
                      >
                        <p className="text-[12px] text-black pt-3">
                          I accept the{" "}
                          <Link
                            href="/buyer-terms-and-conditions"
                            onClick={onClose}
                          >
                            <span className="underline">
                              Terms and Conditions
                            </span>
                          </Link>
                          ,
                          <Link href="/privacy-policy" onClick={onClose}>
                            {" "}
                            <span className="underline">Privacy Policy</span>
                          </Link>
                          ,and{" "}
                          <Link
                            href="/end-user-license-agreement"
                            onClick={onClose}
                          >
                            <span className="underline">
                              End User License Agreement
                            </span>
                          </Link>
                        </p>
                      </label>
                    }
                    onPointerEnterCapture
                    onPointerLeaveCapture
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    disabled={!showChecked || !!errors.mobile}
                    type="submit"
                    id="sign-in-button"
                    className="w-[200px] py-3 px-4 bg-[#6a4fa3] my-10 rounded-full text-white text-sm !font-normal disabled:bg-opacity-[0.3]"
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
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div
              className={`{w-[400px] rounded-b-lg bg-white px-3 py-5 grid place-items-center  ${
                page === "cartLogin" ? "border border-gray-300" : ""
              }`}
            >
              <form onSubmit={handleSubmitOtp(verifyOtp)} className="w-[320px]">
                <div className="text-[12px] text-black pb-3 pt-5">{`We have sent you an SMS with a code to +91${phoneNumber}`}</div>
                <div className="flex flex-col mb-4">
                  <input
                    autoFocus
                    type="tel"
                    id="otp"
                    {...registerOtp("otp", { required: true })}
                    placeholder={"Enter OTP"}
                    onFocus={handleFocus}
                    className="pl-2 py-[8px] border bg-gradient-login-input border-[#b5b5b8] rounded-full px-3 outline-none  w-full text-black"
                  />
                  <span className="text-xs text-red-500 ml-4">
                    {errorsOtp.otp?.message?.toString()}
                  </span>
                </div>
                <div>
                  <div className="flex  items-center">
                    <div
                      className={`${
                        resendTimeout < 1 ? "hidden" : "block"
                      } text-[12px] text-black`}
                    >
                      Resend code in {resendTimeout} seconds
                    </div>

                    {resendTimeout < 1 && (
                      <button
                        className="text-[#6a4fa3] text-[14px] pl-4 ml-auto"
                        onClick={resendOtp}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    disabled={!!errorsOtp.otp}
                    type="submit"
                    className="w-[150px] py-3 px-4 bg-[#6a4fa3] my-10 rounded-full text-white text-sm !font-normal disabled:bg-opacity-[0.3]"
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
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginMain;
