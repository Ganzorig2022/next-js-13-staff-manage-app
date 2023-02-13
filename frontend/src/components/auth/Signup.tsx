import { useAuth } from '@/hooks/useAuth';
import { LoginView } from '@/recoil/loginAtom';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';

type FormData = {
  email: string;
  password: string;
};

type Props = {
  toggleView: (view: LoginView) => void;
};

const SignUp = ({ toggleView }: Props) => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    await signUp(data.email, data.password);
    // save to MONGODB
    const response = await axios.post('/api/user', {
      username: 'Ganzorig',
      email: data.email,
    });
    console.log(response);
    setLoading(false);
  };

  return (
    <>
      <div className='mt-24 rounded bg-white py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 rounded'>
          <h1 className='text-4xl font-semibold text-black text-center'>
            Sign Up
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
            <label className='inline-block w-full'>
              <input
                type='password'
                {...register('password', { required: true })}
                placeholder='Password'
                className={`customInput ${
                  errors.password && 'border-b-2 border-red-500'
                }`}
              />
              {errors.password && (
                <p className='p-1 text-[13px] font-light  text-red-500'>
                  Your password must contain between 4 and 60 characters.
                </p>
              )}
            </label>
          </div>
          {loading ? (
            <div className='w-full text-center'>
              <PulseLoader size={14} color='#203E76' />
            </div>
          ) : (
            <button
              className='w-full rounded bg-[#203E76] py-3 font-semibold text-white'
              type='submit'
            >
              Sign Up
            </button>
          )}
        </form>
        <div className='flex flex-row items-center justify-center mt-5'>
          <p className='text-[gray]'>Or already signed up?</p>
          <button
            className='cursor-pointer text-[#203E76] font-semibold hover:underline ml-1'
            type='submit'
            onClick={() => toggleView('login')}
          >
            Sign In now
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
