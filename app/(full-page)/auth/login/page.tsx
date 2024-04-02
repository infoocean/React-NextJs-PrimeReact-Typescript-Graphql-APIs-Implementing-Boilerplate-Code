/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import Link from 'next/link';

const LoginPage = () => {
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
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
                      <label htmlFor="email" className="block text-900 font-medium mb-2">
                          Email
                      </label>
                      <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />
                      <label htmlFor="password" className="block text-900 font-medium mb-2">
                          Password
                      </label>
                      <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" />
                      <div className="flex align-items-center justify-content-between mb-6">
                          <div className="flex align-items-center">
                              <Checkbox id="rememberme" onChange={(e) => setChecked(e.checked as boolean)} checked={checked} className="mr-2" />
                              <label htmlFor="rememberme">Remember me</label>
                          </div>
                          <Link className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer" href={"/auth/forgotpassword"}>Forgot your password?</Link>
                      </div>
                      <Button label="Sign In" icon="pi pi-user" className="w-full" />
                  </div>
              </div>
          </div>
        </div>
    );
};

export default LoginPage;
