import { useAuth } from '@/hooks/useAuth';
import { adminState } from '@/recoil/adminAtom';
import { drawerState } from '@/recoil/drawerOpen';
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import ProfileMenu from './ProfileMenu';

const Header = () => {
  const router = useRouter();
  const isAdmin = useRecoilValue(adminState);
  const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState);
  return (
    <main className='flex flex-row py-2 px-3 bg-[#28243d] w-full justify-between items-center sticky top-0 z-50'>
      <div className='flex flex-row items-center'>
        {!drawerOpen && (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={() => setDrawerOpen(true)}
            edge='start'
            // sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <Menu className='text-white' />
          </IconButton>
        )}
        <div
          className='text-white cursor-pointer'
          onClick={() => router.push('/')}
        >
          Home page
        </div>
      </div>
      <div className='text-white cursor-pointer underline'>
        You are logged in as {isAdmin ? 'admin' : 'user'}
      </div>
      <div>
        <ProfileMenu />
      </div>
    </main>
  );
};

export default Header;
