/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordFormValidation } from '@/app/form_feild_validation/validation';
import { resetpasswordFormValues } from '@/types/auth';
import { resetPassword } from '@/app/services/auth.services';
import MyProgressSpinner from '@/components/Spinner';
import { ErrorFormMsg } from '@/components/ErrorMessgae';

const LoginPage = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const [spinner, setShowspinner] = React.useState(false);
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
      } = useForm<resetpasswordFormValues>({
        resolver: yupResolver(resetPasswordFormValidation),
    });

    const onSubmit: SubmitHandler<resetpasswordFormValues> = async (data) => {
      setShowspinner(true);
      setbuttonDisabled(true);
      const token = localStorage.getItem('reset_password_token');
      const reqData = { password: data.password, token: token };
      const res = await resetPassword(reqData);
      if(res?.success === true){
          toast.current?.show({severity:"success", summary:"Sign Up", detail:"Passowrd reset successfully !",  life: 2000 });
          reset();
          setShowspinner(false);
          setbuttonDisabled(false);
          router.push("/auth/login");
      }else{
          toast.current?.show({severity:"error", summary:"Sign Up", detail:"Email allready registred!",  life: 2000 });
          setShowspinner(false);
          setbuttonDisabled(false);
      }
    };

    return (
        <div className={containerClassName}>
          <div className="flex align-items-center justify-content-center">
              <div className="surface-card p-4 shadow-2 border-round w-full ">
                  <div className="text-center mb-5">
                      <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                      <div className="text-900 text-3xl font-medium mb-3">Welcome To Mango Connect</div>
                      <span className="text-600 font-medium line-height-3">Reset your password to start with us</span>
                  </div>
                  <div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2">
                          <label htmlFor="password" className="block text-900 font-medium mb-2">
                            Password
                          </label>
                          <InputText id="password" type="password" {...register("password")} placeholder="Password" className="w-full mb-2" />
                          {errors && errors.password? ErrorFormMsg(errors?.password?.message): ""}
                        </div>
                        <div className="mb-2">
                          <label htmlFor="confirmpassword" className="block text-900 font-medium mb-2">
                            Confirm Password
                          </label>
                          <InputText id="confirmpassword" type="password" {...register("confirmpassword")} placeholder="Confirm Password" className="w-full mb-2" />
                          {errors && errors.confirmpassword? ErrorFormMsg(errors?.confirmpassword?.message): ""}
                        </div>
                      <Button label="Reset" disabled={buttonDisabled} icon={!spinner ? "pi pi-lock" :  <MyProgressSpinner/>}  className="w-full mt-3" />
                      </form>
                  </div>
              </div>
          </div>
        </div>
    );
};

export default LoginPage;
