import img1 from '../../../assets/images/logoAbout/rak.png';
import img2 from '../../../assets/images/logoAbout/kludi.png';
import img3 from '../../../assets/images/logoAbout/porcelain.png';
import img4 from '../../../assets/images/logoAbout/cascade.svg';

import { Box, CardMedia, Grid, Typography, useMediaQuery, Card } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const images = [
  { src: img1, path: '/about/rakceramics' },
  { src: img2, path: '/about/kludirak' },
  { src: img3, path: '/about/rakporcelain' },
  { src: img4, path: '/about/cascade' },
];

const getCardStyles = () => ({
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '300px',
  width: '300px',
  '@media (max-width:600px)': {
    width: '250px',
    height: '250px',
  },
  '@media (max-width:480px)': {
    width: '220px',
    height: '220px',
  },
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  '&:active': {
    transform: 'scale(0.95)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
});

type CardItemProps = {
  image: string;
  padding: string;
  onClick: () => void;
};

const CardItem: React.FC<CardItemProps> = ({ image, padding, onClick }) => (
  <Grid item>
    <Card sx={getCardStyles()} onClick={onClick}>
      <CardMedia
        component="img"
        image={image}
        sx={{
          maxHeight: '100%',
          maxWidth: '100%',
          objectFit: 'contain',
          padding: padding,
        }}
      />
    </Card>
  </Grid>
);

const AboutPage: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box>
      <Typography sx={{ mt: '30px' }} variant="h4">
        О НАС
      </Typography>
      <Box sx={{ p: 4, mt: 3 }}>
        <Grid container spacing={isSmallScreen ? 1.5 : 4} mt={2} mb={3} justifyContent={'center'}>
          {images.map((image) => (
            <CardItem key={image.path} image={image.src} padding="40px" onClick={() => handleClick(image.path)} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutPage;
