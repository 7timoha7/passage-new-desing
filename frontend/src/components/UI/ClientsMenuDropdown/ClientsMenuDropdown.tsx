import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

interface Props {
  close: () => void;
}

const links = [
  { title: 'ДОСТАВКА', to: '/delivery' },
  { title: 'РАССРОЧКА', to: '/installment' },
  { title: 'ГАРАНТИЯ', to: '/warranty' },
  { title: 'ДИЗАЙНЕРАМ', to: '/designers' },
];

const ClientsMenuDropdown: React.FC<Props> = ({ close }) => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          padding: '10px',
          zIndex: 1101,
          flexWrap: 'wrap',
        }}
      >
        {links.map((link) => (
          <Box key={link.to}>
            <Box
              component={Link}
              to={link.to}
              onClick={close}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'rgb(0,0,0)',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { color: '#ddbe86' },
              }}
            >
              <MenuIcon fontSize="small" sx={{ mr: '8px' }} />
              <Typography sx={{ textTransform: 'uppercase' }}>{link.title}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ClientsMenuDropdown;
