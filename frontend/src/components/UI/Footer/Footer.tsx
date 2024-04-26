import React from 'react';
import { AppBar, Box, Container, Divider, Grid, Link, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FooterStyle } from '../../../styles';

const Footer = () => {
  const handlePhoneClick = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={FooterStyle}>
        <Container maxWidth={'lg'} sx={{ paddingY: 2 }}>
          <Grid container justifyContent={'space-between'}>
            <Grid item sx={{ background: 'rgba(40,40,40,0.66)', p: 2, borderRadius: '10px', mb: 1 }}>
              <Grid item sx={{ mt: 1 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: '#ffffff',
                    '&:hover': { color: '#b9a87e' },
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() => handlePhoneClick('+996997100500')}
                >
                  <CallIcon />
                  +996 997 100500
                </Typography>
              </Grid>
              <Grid item sx={{ mt: 1 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: '#ffffff',
                    '&:hover': { color: '#b9a87e' },
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() => handlePhoneClick('+996553100500')}
                >
                  <CallIcon />
                  +996 553 100500
                </Typography>
              </Grid>
            </Grid>
            <Grid item sx={{ background: 'rgba(40,40,40,0.66)', p: 2, borderRadius: '10px' }}>
              <Grid item sx={{ mt: 1 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: '#ffffff',
                    '&:hover': { color: '#b9a87e' },
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    href="https://www.instagram.com/passage.kg/"
                    color="inherit"
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <InstagramIcon />
                    Passage
                  </Link>
                </Typography>
              </Grid>
              <Grid item sx={{ mt: 1 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: '#ffffff',
                    '&:hover': { color: '#b9a87e' },
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() => handleEmailClick('passagerakcaramics@gmail.com')}
                >
                  <EmailIcon />
                  passagerakcaramics@gmail.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
          <Typography sx={{ textAlign: 'center', marginTop: 1, fontSize: '12px', color: '#ffffff' }}>
            <span style={{ background: 'rgba(40,40,40,0.66)', padding: '5px', borderRadius: '10px' }}>
              <Link
                sx={{
                  textDecoration: 'none',
                  color: '#ffffff',
                  '&:hover': { color: '#b9a87e' },
                }}
                href="https://summary-topaz.vercel.app/"
                color="inherit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Разработчик проекта: Маркелов Артем
              </Link>
            </span>
          </Typography>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Footer;
