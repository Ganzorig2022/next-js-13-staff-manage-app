import { CREATE_NEW_USER } from '@/graphql/mutations/user';
import { useMutation } from '@apollo/client';
import { Box, Modal } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  openAddStaff: boolean;
  setOpenAddStaff: Dispatch<SetStateAction<boolean>>;
};

const AddStaffModal = ({ openAddStaff, setOpenAddStaff }: Props) => {
  const [formData, setFormData] = useState<UserFormType>({
    email: '',
    username: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
  });
  const { username, email, phone, address, birthDate, gender } = formData;

  //Apollo Client request for Apollo Server/Prisma/MongoDB
  const [createNewUser, { data, error }] = useMutation(CREATE_NEW_USER, {
    variables: {
      email,
      username,
      address,
      phone,
      birthDate,
      gender,
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const saveRecord = () => {
    toast.success('Successfully created!');
    createNewUser();
    setOpenAddStaff(false);
  };

  return (
    <div>
      <Modal open={openAddStaff}>
        <Box sx={style}>
          <>
            <div className='text-center font-bold text-xl uppercase'>
              Add staff information
            </div>
          </>
          <div className='shadow-md p-5 bg-white rounded mt-2'>
            <div className='flex flex-col space-y-2'>
              <div className='flex flex-row space-x-2 items-center'>
                <div className='font-semibold'>Name:</div>
                <input
                  type='text'
                  id='username'
                  value={username}
                  className='editInput border-b border-gray-400 bg-emerald-50'
                  onChange={onChange}
                />
              </div>
              <div className='flex flex-row space-x-2 items-center'>
                <div className='font-semibold'>Email:</div>
                <input
                  type='email'
                  id='email'
                  value={email}
                  className='editInput border-b border-gray-400 bg-emerald-50'
                  onChange={onChange}
                />
              </div>
              <div className='flex flex-row space-x-2 items-center'>
                <div className='font-semibold'>Phone:</div>
                <input
                  type='text'
                  id='phone'
                  value={phone}
                  className='editInput border-b border-gray-400 bg-emerald-50'
                  onChange={onChange}
                />
              </div>
              <div className='flex flex-row space-x-2 items-center'>
                <div className='font-semibold'>Address:</div>
                <input
                  type='text'
                  id='address'
                  value={address}
                  className='editInput border-b border-gray-400 bg-emerald-50'
                  onChange={onChange}
                />
              </div>
              <div className='flex flex-row space-x-2 items-center'>
                <div className='font-semibold w-[100px]'>Birth date:</div>
                <input
                  type='text'
                  id='birthDate'
                  value={birthDate}
                  className='editInput border-b border-gray-400 bg-emerald-50'
                  onChange={onChange}
                />
              </div>
              <div className='flex flex-row space-x-2 items-center'>
                <div className='font-semibold'>Gender:</div>
                <input
                  type='text'
                  id='gender'
                  value={gender}
                  className='editInput border-b border-gray-400 bg-emerald-50'
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <>
            <div className='flex flex-row justify-center items-center space-x-2 mt-5'>
              <button
                onClick={() => setOpenAddStaff(false)}
                className='bg-gray-500 hover:bg-gray-400 px-2 py-2 rounded shadow-md text-white'
              >
                Cancel
              </button>
              <button
                onClick={saveRecord}
                className='bg-red-500 hover:bg-red-400 px-2 py-2 rounded shadow-md text-white'
              >
                Save record
              </button>
            </div>
          </>
        </Box>
      </Modal>
    </div>
  );
};

export default AddStaffModal;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'hidden',
  borderRadius: '10px',
};
