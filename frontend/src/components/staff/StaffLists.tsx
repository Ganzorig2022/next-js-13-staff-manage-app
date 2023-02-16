import { DELETE_USER_BY_ID } from '@/graphql/mutations/user';
import { GET_ALL_USERS } from '@/graphql/queries/user';
import { useAuth } from '@/hooks/useAuth';
import { adminState } from '@/recoil/adminAtom';
import { useMutation, useQuery } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import AddStaffModal from './AddStaffModal';

interface DataType extends UserFormType {
  id: string;
}

const StaffLists = () => {
  const { user } = useAuth();
  const [rowsData, setRowsData] = useState<DataType[]>([]);
  const [open, setOpen] = useState(false);
  const [openAddStaff, setOpenAddStaff] = useState(false);
  const openModalHanlder = () => setOpen(true);
  const closeModalHandler = () => setOpen(false);
  const [selectedId, setSelectedId] = useState('');
  const isAdmin = useRecoilValue(adminState);

  // 1) Get All Users Data from MONGODB/APOLLO SERVER
  const { data, error } = useQuery(GET_ALL_USERS, {
    pollInterval: 500,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
  });

  // 2) Delete specific User from MONGODB/APOLLO SERVER
  const [deleteUserById, { data: deletedUser }] = useMutation(
    DELETE_USER_BY_ID,
    {
      variables: { id: selectedId },
      refetchQueries: [{ query: GET_ALL_USERS }, 'GetAllUsers'],
    }
  );

  const onSelectedHandler = (id: string) => {
    setSelectedId(id);
    openModalHanlder();
  };

  // 3) Delete specific User from MONGODB/APOLLO SERVER
  const deleteRecord = () => {
    deleteUserById();
    toast.error('Successfully deleted!');
    closeModalHandler();
  };

  // Persisting data after refresh or first render
  useEffect(() => {
    if (user) {
      if (data?.getAllUsers) {
        setRowsData([...data?.getAllUsers]);
      }
    }
  }, [user, data]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='lg:w-[1000px] md:w-[800px] shadow p-5 bg-white rounded mt-5 border-gray-100'>
        <div className='flex flex-row items-center justify-between mb-2'>
          <div className='text-center font-bold uppercase text-xl'>
            Staff Lists
          </div>
          <div>
            <button
              className='bg-purple-800 text-white py-1 px-5 rounded-full hover:bg-purple-600'
              onClick={() => {
                !isAdmin && toast.error('You have no permission!');
                setOpenAddStaff((prev) => !prev);
              }}
            >
              <AddIcon />
              Add staff info
            </button>
          </div>
        </div>
        <div className='overflow-x-scroll'>
          {isAdmin && (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead className='bg-gray-200'>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Birth date</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsData?.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                        className='hover:bg-red-50'
                        onClick={() => onSelectedHandler(row.id)}
                      >
                        <TableCell component='th' scope='row'>
                          {row.id.substring(21)}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row.username}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row.email}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row.phone}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row.address}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row.birthDate}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row.gender}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row.role}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div>
                <Modal open={open}>
                  <Box sx={style}>
                    <div className='text-center font-bold text-xl'>
                      Are you sure to delete it?
                    </div>
                    <div className='text-center mt-5'>
                      You are going to delete this record.
                    </div>
                    <div className='flex flex-row justify-center items-center space-x-2 mt-5'>
                      <button
                        onClick={closeModalHandler}
                        className='bg-gray-500 hover:bg-gray-400 px-2 py-2 rounded shadow-md text-white'
                      >
                        Cancel
                      </button>
                      <button
                        onClick={deleteRecord}
                        className='bg-red-500 hover:bg-red-400 px-2 py-2 rounded shadow-md text-white'
                      >
                        Delete record
                      </button>
                    </div>
                  </Box>
                </Modal>
              </div>
              <>
                <AddStaffModal
                  openAddStaff={openAddStaff}
                  setOpenAddStaff={setOpenAddStaff}
                />
              </>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffLists;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};
