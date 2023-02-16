import { useAuth } from '@/hooks/useAuth';
import { LoginView } from '@/recoil/loginAtom';
import { ChangeEvent, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { useMutation, gql } from '@apollo/client';
import { FormEvent } from 'react';
import { CREATE_NEW_USER } from '@/graphql/mutations/user';

// type def for form inputs
type FormData = {
  email: string;
  password: string;
  role: string;
};

type Props = {
  toggleView: (view: LoginView) => void;
};

const SignUp = ({ toggleView }: Props) => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    role: '',
  });

  const { email, password, role } = formData;

  //Apollo Client request for Apollo Server/Prisma/MongoDB
  const [createNewUser, { data, error }] = useMutation(CREATE_NEW_USER, {
    variables: {
      email,
      role,
    },
  });

  //Sign Up / Save Data
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    //save login to firebase
    await signUp(email, password);

    // save to MONGODB/Prisma/Apollo Server
    createNewUser();

    setLoading(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  console.log(formData.role);

  return (
    <>
      <div className='mt-24 rounded bg-white py-10 px-6 md:mt-0 md:max-w-md sm:max-w-sm md:px-14'>
        <form onSubmit={onSubmit} className='space-y-8 rounded'>
          <h1 className='text-4xl font-semibold text-black text-center'>
            Sign Up
          </h1>
          <div className='space-y-4'>
            <label className='inline-block w-full'>
              <input
                type='email'
                placeholder='Email'
                className='customInput'
                name='email'
                onChange={onChangeHandler}
              />
            </label>
            <label className='inline-block w-full'>
              <input
                type='password'
                placeholder='Password'
                className='customInput'
                name='password'
                onChange={onChangeHandler}
                // className={`customInput ${
                //   errors.password && 'border-b-2 border-red-500'
                // }`}
              />
              {/* {errors.password && (
                <p className='p-1 text-[13px] font-light  text-red-500'>
                  Your password must contain between 4 and 60 characters.
                </p>
              )} */}
            </label>
            <label className='inline-block w-full'>
              <select
                name='Role'
                id='role'
                onChange={onSelectHandler}
                className='customInput'
              >
                <option value='admin'>Admin</option>
                <option value='user'>User</option>
              </select>
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
