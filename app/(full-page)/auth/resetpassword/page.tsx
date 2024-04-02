/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

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
                      <span className="text-600 font-medium line-height-3">Reset your password to start with us</span>
                  </div>
                  <div>
                      <label htmlFor="password" className="block text-900 font-medium mb-2">
                        Password
                      </label>
                      <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" />
                      <label htmlFor="confirmpassword" className="block text-900 font-medium mb-2">
                        Confirm Password
                      </label>
                      <InputText id="confirmpassword" type="password" placeholder="Confirm Password" className="w-full mb-3" />
                      <Button label="Reset" icon="pi pi-user" className="w-full mt-3" />
                  </div>
              </div>
          </div>
        </div>
    );
};

export default LoginPage;
