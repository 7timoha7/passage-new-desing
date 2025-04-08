import React from 'react';
import { Link } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';

const LinkTel = () => {
  const handlePhoneClick = (phoneNumber: string) => {
    if (typeof window.ym !== 'undefined') {
      window.ym(95546639, 'extLink', `tel:${phoneNumber}`);
    }
  };

  return (
    <Link
      href="tel:+996553100500"
      color="inherit"
      underline="none"
      onClick={() => handlePhoneClick('+996553100500')}
      sx={{
        color: 'rgb(0,0,0)',
        fontSize: '15px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': { color: '#ddbe86' },
      }}
    >
      <CallIcon sx={{ mr: 0.7 }} />
      +996 553 100500
    </Link>
  );
};

export default LinkTel;
