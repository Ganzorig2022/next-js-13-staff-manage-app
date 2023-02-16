import { DELETE_USER, UPDATE_SINGLE_USER } from '@/graphql/mutations/user';
import { GET_SINGLE_USER } from '@/graphql/queries/user';
import { useAuth } from '@/hooks/useAuth';
import { adminState } from '@/recoil/adminAtom';
import { useMutation, useQuery } from '@apollo/client';
import { deleteUser as deleteFirebaseUser } from 'firebase/auth';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';

const ProfileContent = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const isAdmin = useRecoilValue(adminState);

  // 2) getting user data from MONGODB using Apollo Client
  const { loading, data, refetch } = useQuery(GET_SINGLE_USER, {
    variables: { email: user?.email },
    pollInterval: 500,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
  });

  const [originalFormdata] = useState({
    email: data?.getSingleUser?.email || 'empty',
    username: data?.getSingleUser?.username || 'empty',
    phone: data?.getSingleUser?.phone || 'empty',
    birthDate: data?.getSingleUser?.birthDate || 'empty',
    gender: data?.getSingleUser?.gender || 'empty',
    address: data?.getSingleUser?.address || 'empty',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: data?.getSingleUser?.email,
        username: data?.getSingleUser?.username,
        phone: data?.getSingleUser?.phone,
        birthDate: data?.getSingleUser?.birthDate,
        gender: data?.getSingleUser?.gender,
        address: data?.getSingleUser?.address,
      }));
    }
  }, [user, data]);

  const [formData, setFormData] = useState<ProfileFormType>({
    email: originalFormdata.email,
    username: originalFormdata.username,
    phone: originalFormdata.phone,
    birthDate: originalFormdata.birthDate,
    gender: originalFormdata.gender,
    address: originalFormdata.address,
  });

  const { username, email, phone, address, birthDate, gender } = formData;

  // 2) updating user data to MONGODB using Apollo Client
  const [updateUser, { data: updatedUser, error }] = useMutation(
    UPDATE_SINGLE_USER,
    {
      variables: { username, email, phone, birthDate, address, gender },
      refetchQueries: [{ query: GET_SINGLE_USER }, 'GetSingleUser'],
    }
  );
  const [deleteUser, { data: deletedUser }] = useMutation(DELETE_USER, {
    variables: { email },
    // refetchQueries: [{ query: GET_SINGLE_USER }, 'GetSingleUser'],
  });
  // Works when click the SAVE button
  const updateProfile = async () => {
    toast.success('You have successfully updated your profile');
    updateUser();
    refetch({ email: user?.email });
    setEditMode(false);
  };

  // Works when click the CANCEL button
  const cancelEdit = () => {
    setFormData(() => ({ ...(originalFormdata as UserFormType) }));
    setEditMode(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const deleteProfile = () => {
    if (!isAdmin) {
      toast.error('You have no permission. Only admin can delete.');
      return;
    }
    toast.error('You have deleted your account');
    deleteUser();
    deleteFirebaseUser(user as any);
  };

  // console.log('user deleted>>>>>>', deletedUser);

  // console.log('after updating>>>>>>', updatedUser);
  // console.log('data received>>>>>>', data);

  return (
    <div className='flex flex-col items-center justify-center'>
      {/* Content1 */}
      <div className='w-[800px] md:w-[600px] shadow p-5 bg-white rounded mt-5 border-gray-100'>
        <div className='relaitve  mx-auto'>
          <Toaster />
          {/* BACKGROUND */}
          <div className='relative h-[150px]'>
            <Image
              src={
                'https://images.unsplash.com/photo-1560780552-ba54683cb263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              }
              alt='profile'
              fill
              className='object-cover rounded'
            />
          </div>
          {/* AVATAR */}
          <div className='relative'>
            <div className='absolute -top-10 left-5 h-[100px] w-[100px] overflow-hidden '>
              <Image
                src={
                  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
                }
                alt='profile'
                fill
                className='object-cover rounded border-2 border-white'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col ml-36 overflow-hidden'>
          <h2 className='font-bold text-lg text-gray-500'>
            {originalFormdata.username}
          </h2>
          <div className='flex flex-row justify-between items-center'>
            <div>Designer</div>
            <div>
              {!editMode && (
                <button
                  className='bg-purple-800 text-white py-1 px-5 rounded-full'
                  onClick={() => setEditMode(true)}
                >
                  {`${
                    !data?.getSingleUser ? 'Create a profile' : 'Edit Profile'
                  } `}
                </button>
              )}
              {editMode && (
                <>
                  <button
                    className='bg-gray-300 text-black py-1 px-5 rounded-full'
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                  <button
                    className='bg-purple-800 text-white py-1 px-5 rounded-full ml-2'
                    onClick={updateProfile}
                  >
                    Save Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/*=========== Content2 */}
      <div className='w-[800px] md:w-[600px] shadow-md p-5 bg-white rounded mt-10 border border-gray-200'>
        <div className='flex flex-col space-y-2'>
          <div className='flex flex-row space-x-2 items-center'>
            <div className='font-semibold'>Name:</div>
            <input
              type='text'
              id='username'
              value={username}
              disabled={!editMode}
              className={`${
                editMode && 'bg-purple-100 border border-purple-500'
              } editInput`}
              onChange={onChange}
            />
          </div>
          <div className='flex flex-row space-x-2 items-center'>
            <div className='font-semibold'>Email:</div>
            <input
              type='email'
              id='email'
              value={email}
              disabled={!editMode}
              className={`${
                editMode && 'bg-purple-100 border border-purple-500'
              } editInput`}
              onChange={onChange}
            />
          </div>
          <div className='flex flex-row space-x-2 items-center'>
            <div className='font-semibold'>Phone:</div>
            <input
              type='text'
              id='phone'
              value={phone}
              disabled={!editMode}
              className={`${
                editMode && 'bg-purple-100 border border-purple-500'
              } editInput`}
              onChange={onChange}
            />
          </div>
          <div className='flex flex-row space-x-2 items-center'>
            <div className='font-semibold'>Address:</div>
            <input
              type='text'
              id='address'
              value={address}
              disabled={!editMode}
              className={`${
                editMode && 'bg-purple-100 border border-purple-500'
              } editInput`}
              onChange={onChange}
            />
          </div>
          <div className='flex flex-row space-x-2 items-center'>
            <div className='font-semibold w-[100px]'>Birth date:</div>
            <input
              type='text'
              id='birthDate'
              value={birthDate}
              disabled={!editMode}
              className={`${
                editMode && 'bg-purple-100 border border-purple-500'
              } editInput`}
              onChange={onChange}
            />
          </div>
          <div className='flex flex-row space-x-2 items-center'>
            <div className='font-semibold'>Gender:</div>
            <input
              type='text'
              id='gender'
              value={gender}
              disabled={!editMode}
              className={`${
                editMode && 'bg-purple-100 border border-purple-500'
              } editInput`}
              onChange={onChange}
            />
          </div>
          <div className='text-right'>
            <button
              className='bg-red-700 text-white py-1 px-5 rounded-full ml-2 w-fit'
              onClick={deleteProfile}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
