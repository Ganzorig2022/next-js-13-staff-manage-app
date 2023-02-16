import { useAuth } from '@/hooks/useAuth';
import { drawerState } from '@/recoil/drawerOpen';
import {
  Accessibility,
  AccountCircle,
  AdminPanelSettings,
  ChevronLeft,
  Logout,
  VpnKey,
} from '@mui/icons-material';
import { IconButton, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const drawerWidth = 200;

export default function Sidebar() {
  const { logout } = useAuth();
  const router = useRouter();

  const handler = (id: string) => {
    if (id === 'Auth Pages') router.push('/auth');
    if (id === 'Log out') logout();
    if (id === 'Profile') router.push('/profile');
  };
  const [open, setOpen] = useRecoilState(drawerState);

  return (
    <Box sx={{ display: 'flex', border: 'none' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <div className='bg-[#28243d] text-right'>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft className='text-white' />
          </IconButton>
        </div>
        <List className='bg-[#28243d] h-full'>
          {[
            'Admin panel',
            'Staff Lists',
            'Auth Pages',
            'Profile',
            'Log out',
          ].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ color: 'white' }}
              className='hover:bg-[#5e5688]'
            >
              <ListItemButton
                onClick={() => handler(text)}
                sx={{ background: index === 1 && '#5e5688' } as SxProps }
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  {index === 0 && <AdminPanelSettings />}
                  {index === 1 && <Accessibility />}
                  {index === 2 && <VpnKey />}
                  {index === 3 && <AccountCircle />}
                  {index === 4 && <Logout />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
