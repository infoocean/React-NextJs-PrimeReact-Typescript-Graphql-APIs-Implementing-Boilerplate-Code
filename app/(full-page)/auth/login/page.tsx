/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormValues } from '@/types/auth';
import { ErrorFormMsg } from '@/components/ErrorMessgae';
import { loginFormvalidation } from '@/app/form_feild_validation/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleLogin } from '@/app/services/auth.services';
import { useRouter } from 'next/navigation';
import MyProgressSpinner from '@/components/Spinner';
import { Toast } from 'primereact/toast';

const LoginPage = () => {
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const [spinner, setShowspinner] = React.useState(false);
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginFormvalidation),
    });

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        setShowspinner(true);
        setbuttonDisabled(true);
        const reqData = { email: data.email, password: data.password };
        const res = await handleLogin(reqData);
        if(res?.success === true){
            localStorage.setItem("x-access-token", res?.data?.login?.token);
            reset();
            setShowspinner(false);
            setbuttonDisabled(false);
            router.push("/");
        }else{
            toast.current?.show({severity:"error", summary:"login", detail:"Invalid login credentials",  life: 2000 });
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
                            <span className="text-600 font-medium line-height-3">Do not have an account?</span>
                            <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href='/auth/register'>Create today!</Link>
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
                                <div className="mb-2">
                                    <label htmlFor="password" className="block text-900 font-medium mb-2">
                                        Password
                                    </label>
                                    <InputText id="password" type="password"  {...register("password")} placeholder="Password" className="w-full mb-2" />
                                    {errors && errors.password? ErrorFormMsg(errors?.password?.message): ""}
                                </div>
                                <div className="flex align-items-center justify-content-between mb-6">
                                    <div className="flex align-items-center">
                                        <Checkbox id="rememberme" onChange={(e) => setChecked(e.checked as boolean)} checked={checked} className="mr-2" />
                                        <label htmlFor="rememberme">Remember me</label>
                                    </div>
                                    <Link className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer" href={"/auth/forgotpassword"}>Forgot your password?</Link>
                                </div>
                                <Button
                                    disabled={buttonDisabled} 
                                    label="Sign In"
                                    icon={!spinner ? "pi pi-user" :  <MyProgressSpinner/>} 
                                    className="w-full"
                                    />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toast ref={toast} />
        </>
    );
};
export default LoginPage;
