import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_SINGLE_USER } from '@/graphql/mutations/user';
import { GET_SINGLE_USER } from '@/graphql/queries/user';

const ProfileContent = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  // 2) getting user data from MONGODB using Apollo Client
  const { loading, data, refetch } = useQuery(GET_SINGLE_USER, {
    variables: { email: user?.email },
    pollInterval: 500,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
  });
  const client = useApolloClient();
  // client.readQuery({
  //   query: GET_SINGLE_USER,
  // });

  // useEffect(() => {
  //   refetch();
  // }, []);

  // console.log('first render with latest update>>>>>>', result);

  const [originalFormdata] = useState({
    email: data?.getSingleUser?.email || 'empty',
    username: data?.getSingleUser?.username || 'empty',
    phone: data?.getSingleUser?.phone || 'empty',
    birthDate: data?.getSingleUser?.birthDate || 'empty',
    gender: data?.getSingleUser?.gender || 'empty',
    address: data?.getSingleUser?.address || 'empty',
  });

  const [formData, setFormData] = useState<UserFormType>({
    email: originalFormdata.email,
    username: originalFormdata.username,
    phone: originalFormdata.phone,
    birthDate: originalFormdata.birthDate,
    gender: originalFormdata.gender,
    address: originalFormdata.address,
  });

  const { username, email, phone, address, birthDate, gender } = formData;

  // 2) getting user data from MONGODB using Apollo Client
  const [updateUser, { data: updatedUser, error }] = useMutation(
    UPDATE_SINGLE_USER,
    {
      variables: { username, email, phone, birthDate, address, gender },
      refetchQueries: [{ query: GET_SINGLE_USER }, 'GetSingleUser'],
      // update(cache, { data: { updateUser } }) {
      //   cache.modify({
      //     fields: {
      //       getSingleUser(existing = []) {
      //         const newRef = cache.writeFragment({
      //           data: updateUser,
      //           fragment: gql`
      //             fragment NewUser on User {
      //               email
      //               username
      //               phone
      //               birthDate
      //               gender
      //             }
      //           `,
      //         });
      //         return [...existing, newRef];
      //       },
      //     },
      //   });
      // },
      // onQueryUpdated(observableQuery) {
      //   // Define any custom logic for determining whether to refetch
      //   observableQuery.refetch();
      // },
    }
  );
  // Works when click the SAVE button
  const updateProfile = async () => {
    refetch({ email: user?.email });
    updateUser();
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

  console.log('before updating>>>>>>', data);

  console.log('after updating>>>>>>', updatedUser);

  return (
    <>
      {/* Content1 */}
      <div className='w-[800px] shadow p-5 bg-white rounded mt-5 border-gray-100'>
        <div className='relaitve'>
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
                  Edit Profile
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
      <div className='w-[800px] shadow-md p-5 bg-white rounded mt-10 border border-gray-200'>
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
            <div className='font-semibold'>Birth date:</div>
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
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
