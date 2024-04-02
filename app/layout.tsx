'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { ApolloProvider } from '@apollo/client';
import client from './api/grapgql_api';
import { useEffect } from 'react';
import dotenv from 'dotenv';
import { get_authorization_token } from './services/auth.services';
import { isTokenExpired } from '@/commonfn/check_token_expire';
dotenv.config();

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    useEffect(() => {
        checkApisToken();
    }, [])

    //check apis is working and token is valid
    const checkApisToken = async () =>{
        const auth_token = localStorage.getItem("authorization_token");
        if(auth_token){
            const isvalid = isTokenExpired(auth_token);
            if(isvalid){
              get_authorization_token();  
            }
        }else{
          get_authorization_token();
        }
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
            <ApolloProvider client={client}>
                <PrimeReactProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                </PrimeReactProvider>
            </ApolloProvider>
            </body>
        </html>
    );
}
