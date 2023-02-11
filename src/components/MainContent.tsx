import React from 'react';
import ProfileContent from './ProfileContent';
import StaffListsContent from './StaffListsContent';

const MainContent = () => {
  return (
    <main className='flex flex-col justify-center items-center h-full'>
      <ProfileContent />
      {/* <StaffListsContent /> */}
    </main>
  );
};

export default MainContent;
