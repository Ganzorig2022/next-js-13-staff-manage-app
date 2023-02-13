import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Inbox, Mail } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

const drawerWidth = 200;

export default function Sidebar() {
  const { logout } = useAuth();
  const router = useRouter();

  const handler = (id: string) => {
    if (id === 'Auth Pages') router.push('/auth');
    if (id === 'Log out') logout();
  };

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
        variant='permanent'
        anchor='left'
      >
        <Divider />
        <List className='bg-purple-900 h-full'>
          {[
            'My profile',
            'Staff Lists',
            'Auth Pages',
            'Profile',
            'Log out',
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ color: 'white' }}>
              <ListItemButton onClick={() => handler(text)}>
                <ListItemIcon sx={{ color: 'white' }}>
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
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
