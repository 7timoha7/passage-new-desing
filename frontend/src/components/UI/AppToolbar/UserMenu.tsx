import React, { useState } from 'react';
import { Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/users/usersThunks';
import { useAppDispatch } from '../../../app/hooks';
import { User } from '../../../types';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  user: User;
  close?: () => void;
}

const UserMenu: React.FC<Props> = ({ user, close }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = (path: string) => {
    handleClose();
    navigate(path);
    if (close) {
      close();
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    if (close) {
      await close();
    }
    await navigate('/');
  };

  return (
    <>
      <Grid container>
        <Button onClick={handleClick} color="inherit" sx={{ color: 'black' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }} fontWeight="bold">{`${user.firstName} ${user.lastName}`}</Typography>
            <MenuIcon fontSize={'medium'} sx={{ mt: '-4px' }} />
          </div>
        </Button>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '8px',
            },
          },
        }}
      >
        <div>
          <MenuItem onClick={() => onMenuItemClick('/my-cabinet')} sx={{ color: 'black' }}>
            <ListItemIcon>
              <PersonIcon sx={{ color: 'black' }} />
            </ListItemIcon>
            Мой профиль
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: 'black' }}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: 'black' }} />
            </ListItemIcon>
            Выйти
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};

export default UserMenu;
