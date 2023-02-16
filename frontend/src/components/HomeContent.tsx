import React from 'react';
import ProfileContent from './profile/ProfileContent';
import StaffListsContent from './staff/StaffListsContent';

const MainContent = () => {
  return (
    <main className='flex flex-col justify-center items-center h-full'>
      {/* <ProfileContent /> */}
      <StaffListsContent />
    </main>
  );
};

export default MainContent;
