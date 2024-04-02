/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormValues } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpFormvalidation } from '@/app/form_feild_validation/validation';
import { handleSignUp } from '@/app/services/user.service';
import { ErrorFormMsg } from '@/components/ErrorMessgae';
import { Toast } from 'primereact/toast';
import MyProgressSpinner from '@/components/Spinner';

const RegistrationPage = () => {
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const { layoutConfig } = useContext(LayoutContext);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const [spinner, setShowspinner] = React.useState(false);
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
      } = useForm<SignUpFormValues>({
        resolver: yupResolver(signUpFormvalidation),
    });

    const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
      setShowspinner(true);
      setbuttonDisabled(true);
      const reqData = { first_name: data.first_name, last_name:data?.last_name, email: data.email, phone:data?.phone, password: data.password };
      const res = await handleSignUp(reqData);
      if(res?.success === true){
          toast.current?.show({severity:"success", summary:"Sign Up", detail:"Registration successfull!",  life: 2000 });
          reset();
          router.push("/auth/verification");
      }else{
          toast.current?.show({severity:"error", summary:"Sign Up", detail:"Email allready registred!",  life: 2000 });
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
                      <span className="text-600 font-medium line-height-3">Already have an account?</span>
                      <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href={'/auth/login'}>Login today!</Link>
                  </div>
                  <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-2">
                        <label htmlFor="first_name" className="block text-900 font-medium mb-2">
                          First Name
                        </label>
                        <InputText id="first_name" type="text" {...register("first_name")} placeholder="First name" className="w-full mb-2" />
                        {errors && errors.first_name? ErrorFormMsg(errors?.first_name?.message): ""}
                      </div>
                      <div className="mb-2">
                        <label htmlFor="laet_name" className="block text-900 font-medium mb-2">
                          Last Name
                        </label>
                        <InputText id="last_name" type="text" {...register("last_name")} placeholder="Last name" className="w-full mb-2" />
                        {errors && errors.last_name? ErrorFormMsg(errors?.last_name?.message): ""}
                      </div>
                      <div className="mb-2">
                        <label htmlFor="email" className="block text-900 font-medium mb-2">
                          Email
                        </label>
                        <InputText id="email" type="text" {...register("email")} placeholder="Email address" className="w-full mb-2" />
                        {errors && errors.email? ErrorFormMsg(errors?.email?.message): ""}
                      </div>
                      <div className="mb-2">
                        <label htmlFor="phone" className="block text-900 font-medium mb-2">
                          Number
                        </label>
                        <InputText id="phone" type="text" {...register("phone")} placeholder="Phone number" className="w-full mb-2" />
                      {errors && errors.phone? ErrorFormMsg(errors?.phone?.message): ""}
                      </div>
                      <div className="mb-2">
                        <label htmlFor="password" className="block text-900 font-medium mb-2">
                          Password
                        </label>
                        <InputText id="password" type="password"  {...register("password")} placeholder="Password" className="w-full mb-2" />
                        {errors && errors.password? ErrorFormMsg(errors?.password?.message): ""}
                      </div>
                      <Button label="Register"  disabled={buttonDisabled}    icon={!spinner ? "pi pi-user" :  <MyProgressSpinner/>}  className="w-full mt-3"  />
                    </form>
                  </div>
              </div>
          </div>
        </div>
        <Toast ref={toast} />
      </>
    );
};
export default RegistrationPage;
