import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { PulseLoader } from 'react-spinners';
import { LoginView } from '@/recoil/loginAtom';

type FormData = {
  email: string;
  password: string;
};

type Props = {
  toggleView: (view: LoginView) => void;
};

const ResetPassword = ({ toggleView }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await sendPasswordResetEmail(data.email);
    router.push('/login');
  };

  return (
    <>
      <div className='mt-24 rounded bg-white py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 rounded'>
          <h1 className='text-4xl font-semibold text-black text-center'>
            Reset Password
          </h1>
          <div className='space-y-4'>
            <label className='inline-block w-full'>
              <input
                type='email'
                placeholder='Email'
                className={`customInput ${
                  errors.email && 'border-b-2 border-red-500'
                }`}
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className='p-1 text-[13px] font-light  text-red-500'>
                  Please enter a valid email.
                </p>
              )}
            </label>
          </div>
          {sending ? (
            <div className='w-full text-center'>
              <PulseLoader size={14} color='#203E76' />
            </div>
          ) : (
            <button
              className='w-full rounded bg-[#203E76] py-3 font-semibold text-white'
              type='submit'
            >
              Reset Password
            </button>
          )}
        </form>
        <div className='flex flex-row items-center justify-center mt-5 space-x-2'>
          <button
            className='cursor-pointer text-[#203E76] font-semibold hover:underline ml-1'
            type='submit'
            onClick={() => toggleView('login')}
          >
            Sign In
          </button>
          <span>or</span>
          <button
            className='cursor-pointer text-[#203E76] font-semibold hover:underline ml-1'
            type='submit'
            onClick={() => toggleView('signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
