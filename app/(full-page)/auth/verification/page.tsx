/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useRef } from "react";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import { classNames } from "primereact/utils";
import VerificationForm from "@/components/VerificationForm";
import { OtpData } from "@/types/auth";
import { forgotPassword, handleVerifyOtp } from "@/app/services/auth.services";
import { Toast } from "primereact/toast";

const OtpVerificationPage = () => {
  const toast = useRef<Toast>(null);
  const { layoutConfig } = useContext(LayoutContext);
  const myState = history.state;
  const router = useRouter();
  const [spinner, setShowspinner] = React.useState(false);
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);
  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );
  const handleCancel = () => {
     router.push("/auth/login");
  };

  const handleVerifyCode = async (data: OtpData) => {
    setShowspinner(true);
    setbuttonDisabled(true);
    const verificationCode = `${data?.digit1}${data?.digit2}${data?.digit3}${data?.digit4}`;
    const reqData = { email: "infoocean8454@gmail.com", otp:  parseInt(verificationCode) };
    const res = await handleVerifyOtp(reqData);
    if(res?.success === true){
        toast.current?.show({severity:"success", summary:"Verification", detail:"Verification successfull!",  life: 2000 });
        router.push("/auth/login");
    }else{
        toast.current?.show({severity:"error", summary:"Verification", detail:"Please enter valid otp!",  life: 2000 });
        setShowspinner(false);
        setbuttonDisabled(false);
    }
  };
  const handle_resend_otp = async () => {
    const email = myState && myState?.email;
    const res = await forgotPassword(email);
    if(res?.success === true){
      toast.current?.show({severity:"success", summary:"Verification", detail:"Verification OTP sent successfull!",  life: 2000 });
  }else{
      toast.current?.show({severity:"error", summary:"Verification", detail:"Please enter valid email!",  life: 2000 });
    }
  };

  const verificationFields = [
    { label: "", type: "text", name: "digit1", maxLength: 1 },
    { label: "", type: "text", name: "digit2", maxLength: 1 },
    { label: "", type: "text", name: "digit3", maxLength: 1 },
    { label: "", type: "text", name: "digit4", maxLength: 1 },
  ];
  
  return (
    <>
      <div className={containerClassName}>
            <div className="flex align-items-center justify-content-center">
                <div className="surface-card p-4 shadow-2 border-round w-full ">
                    <div className="text-center mb-5">
                        <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                        <div className="text-900 text-3xl font-medium mb-3">Welcome To Mango Connect</div>
                        <span className="text-600 font-medium line-height-3">We have sent a code to your email</span>
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
                        <div>
                          We have not received the OTP <strong className="font-medium no-underline ml-1 text-right cursor-pointer"
                          style={{ color: "var(--primary-color)" }}
                          onClick={handle_resend_otp}>Resend OTP?</strong> 
                        </div>
                      </div>
                    </div>
                </div>
              </div>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default OtpVerificationPage;