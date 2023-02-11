import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginOpenState } from '@/recoil/loginAtom';
import Login from '@/components/auth/Login';
import SignUp from '@/components/auth/Signup';
import ResetPassword from '@/components/auth/ResetPassword';

const Auth = () => {
  const [loginOpen, setLoginOpen] = useRecoilState(loginOpenState);

  const toggleView = (view: string) => {
    setLoginOpen({
      ...loginOpen,
      view: view as typeof loginOpen.view,
    });
  };

  return (
    <div className='flex h-screen w-screen flex-col justify-center items-center'>
      <Head>
        <title>Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        {/* background */}
        <Image
          src='https://tabsolution.jp/assets/images/hero.jpeg'
          fill
          alt='cover'
          className='-z-10 object-cover'
        />

        {/* Login, SignUp, ResetPassword page */}
        {loginOpen.view === 'login' && <Login toggleView={toggleView} />}
        {loginOpen.view === 'signup' && <SignUp toggleView={toggleView} />}
        {loginOpen.view === 'resetPassword' && (
          <ResetPassword toggleView={toggleView} />
        )}
      </main>
    </div>
  );
};

export default Auth;
