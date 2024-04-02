/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import Link from 'next/link';

const RegistrationPage = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    return (
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
                  <label htmlFor="first_name" className="block text-900 font-medium mb-2">
                        First Name
                      </label>
                      <InputText id="first_name" type="text" placeholder="First name" className="w-full mb-3" />
                      <label htmlFor="laet_name" className="block text-900 font-medium mb-2">
                        Last Name
                      </label>
                      <InputText id="last_ame" type="text" placeholder="Last name" className="w-full mb-3" />
                      <label htmlFor="email" className="block text-900 font-medium mb-2">
                        Email
                      </label>
                      <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />
                      <label htmlFor="number" className="block text-900 font-medium mb-2">
                        Number
                      </label>
                      <InputText id="email" type="text" placeholder="Phone number" className="w-full mb-3" />
                      <label htmlFor="password" className="block text-900 font-medium mb-2">
                        Password
                      </label>
                      <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" />
                      <Button label="Register" icon="pi pi-user" className="w-full mt-3"  />
                  </div>
              </div>
          </div>
        </div>
    );
};
export default RegistrationPage;
