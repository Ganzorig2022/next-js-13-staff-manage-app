import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import ProfileMenu from './ProfileMenu';

const Header = () => {
  const { logout } = useAuth();

  return (
    <main className='flex flex-row py-2 px-3 bg-purple-900 w-full justify-between items-center sticky top-0 z-50'>
      <div className='text-white'>Logo</div>
      <div>
        <ProfileMenu />
      </div>
    </main>
  );
};

export default Header;
