/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
// import AuthForm from "@/demo/components/AuthForm";
import AppTopbar from "@/layout/AppTopbar";
import VerificationForm from "@/demo/components/VerificationForm";
import Link from "next/link";


interface ScreenLockData {
  verificationCode: string;
  verificationCode1: string;
  verificationCode2: string;
  verificationCode3: string;
  verificationCode4: string;
}
interface CancelEventData {
  // Define any properties you may want to pass when canceling the form
}

const LoginPage = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const myState = history.state;
  const router = useRouter();

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  const handleCancel = (data: CancelEventData) => {
    // Handle cancel logic
  };

  const handleVerifyCode = async (data: ScreenLockData) => {
    const codeOne = data && data.verificationCode1;
    const codeTwo = data && data.verificationCode2;
    const codeThree = data && data.verificationCode3;
    const codeFour = data && data.verificationCode4;
    const verificationCode = `${codeOne || ""}${codeTwo || ""}${
      codeThree || ""
    }${codeFour || ""}`;
    // try {
    //   const data = await client.mutate({
    //     mutation: VERIFY_OTP,
    //     variables: {
    //       email: myState && myState?.email,
    //       otp: parseInt(verificationCode),
    //     },
    //   });
    //   if (data && data?.data && data?.data?.verifyOtp) {
    //     if (myState && myState?.path === "signup") {
    //       toast.success("Account successfully verified.");
    //       router.push("/auth/login");
    //     } else {
    //       history.pushState({ token: data?.data?.verifyOtp?.token }, "");
    //       router.push("/auth/reset_password");
    //     }
    //   } else {
    //     console.log("@", data);
    //   }
    // } catch (error) {
    //   if (error instanceof ApolloError) {
    //     const errorMessage = error.message; // Extract the error message
    //     toast.error(errorMessage);
    //   } else {
    //     // Handle other types of errors
    //     console.error("Unexpected Error:", error);
    //   }
    // }
  };
  const handle_resend_otp = async () => {
    const email = myState && myState?.email;
    // try {
    //   const data = await client.mutate({
    //     mutation: FORGOT_PASSWORD,
    //     variables: {
    //       userEmail: email,
    //     },
    //   });
    //   if (data && data?.data && data?.data?.forgotPassword) {
    //     toast.success(
    //       "A verification code has been sent to your email address."
    //     );
    //   } else {
    //     console.log("@");
    //   }
    // } catch (error) {
    //   if (error instanceof ApolloError) {
    //     const errorMessage = error.message; // Extract the error message
    //     toast.error(errorMessage);
    //   } else {
    //     // Handle other types of errors
    //     console.error("Unexpected Error:", error);
    //   }
    // }
  };

  const verificationFields = [
    { label: "", type: "text", name: "verificationCode1", maxLength: 1 },
    { label: "", type: "text", name: "verificationCode2", maxLength: 1 },
    { label: "", type: "text", name: "verificationCode3", maxLength: 1 },
    { label: "", type: "text", name: "verificationCode4", maxLength: 1 },
  ];
  return (
    <div className={containerClassName}>
          <div className="flex align-items-center justify-content-center">
              <div className="surface-card p-4 shadow-2 border-round w-full ">
                  <div className="text-center mb-5">
                      <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                      <div className="text-900 text-3xl font-medium mb-3">Welcome To Mango Connect</div>
                      <span className="text-600 font-medium line-height-3">We have sent a code to you in email</span>
                  </div>
                  <VerificationForm
                    buttonText="Verify"
                    onCancel={handleCancel}
                    onSubmit={handleVerifyCode}
                    fields={verificationFields}
                  />
                  <br />
                  <div>
                    <div className="flex align-items-right mb-2 ">
                      <div
                        className="font-medium no-underline ml-2 text-right cursor-pointer"
                        style={{ color: "var(--primary-color)" }}
                        onClick={handle_resend_otp}
                      >
                        Resend OTP?
                      </div>
                    </div>
                  </div>
              </div>
            </div>
      </div>
  );
};

export default LoginPage;