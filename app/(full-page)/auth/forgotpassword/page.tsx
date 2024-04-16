/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useRef } from 'react';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { forgotPasswordFormvalidation } from '@/app/form_feild_validation/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '@/app/services/auth.services';
import { ErrorFormMsg } from '@/components/ErrorMessgae';
import { Toast } from 'primereact/toast';

const ForgotPasswordPage = () => {
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const { layoutConfig } = useContext(LayoutContext);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const [spinner, setShowspinner] = React.useState(false);
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(forgotPasswordFormvalidation),
    });
    
    const onSubmit: SubmitHandler<any> = async (data) => {
        setShowspinner(true);
        setbuttonDisabled(true);
        const res = await forgotPassword(data.email);
        if(res?.success === true){
            reset();
            setShowspinner(false);
            setbuttonDisabled(false);
            localStorage.setItem("user_email", data.email);
            localStorage.setItem("verification_type", "forgotpassword");
            toast.current?.show({severity:"success", summary:"Forgot password", detail:"Forgot password successfully we have send a otp to your email !",  life: 3000 });
            setTimeout(() => {
                router.push("/auth/verification");
            }, 3000);
        }else{
            toast.current?.show({severity:"error", summary:"Forgot password", detail:"Email is not registered !",  life: 2000 });
            setShowspinner(false);
            setbuttonDisabled(false);
        }
    };
    
    
    return (
        <>
        <div className={containerClassName}>
          <div className="flex align-items-center justify-content-center">
              <div className="surface-card p-4 shadow-2 border-round w-full ">
                  <div className="text-center mb-5">
                      <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                      <div className="text-900 text-3xl font-medium mb-3">Welcome To Mango Connect</div>
                      <span className="text-600 font-medium line-height-3">Forgot your password to start with us</span>
                  </div>
                  <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-2">
                                    <label htmlFor="email" className="block text-900 font-medium mb-2">
                                        Email
                                    </label>
                                    <InputText id="email" type="text" {...register("email")} placeholder="Email address" className="w-full mb-2" />
                                    {errors && errors.email? ErrorFormMsg(errors?.email?.message): ""}
                                </div>
                            <Button label="Submit" icon="pi pi-user" className="w-full mt-3" />
                        </form>
                    </div>
              </div>
          </div>
        </div>
        <Toast ref={toast} />
        </>
    );
};

export default ForgotPasswordPage;
