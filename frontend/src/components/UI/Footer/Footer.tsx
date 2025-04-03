import React from 'react';
import { AppBar, Box, Container, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FooterStyle, toolbarTobAndBottomColor } from '../../../styles';

const Footer = () => {
  const isMobile = useMediaQuery('(max-width:1200px)');

  const handlePhoneClick = (phoneNumber: string) => {
    if (typeof window.ym !== 'undefined') {
      window.ym(95546639, 'extLink', `tel:${phoneNumber}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <Box height={'34px'} sx={{ background: toolbarTobAndBottomColor }}></Box>
      <AppBar position="static" sx={FooterStyle}>
        <Container maxWidth={'xl'} sx={{ paddingY: 1 }}>
          <Grid pt={4} pb={7} container justifyContent={'space-between'} alignItems="flex-start">
            {/* Логотип */}
            {!isMobile ? (
              <Grid item>
                <Link href={'/'}>
                  <img style={{ maxWidth: '300px' }} src="/logo_brown_black.png" alt="passage" />
                </Link>
              </Grid>
            ) : null}

            {/* Социальные сети */}
            <Grid item sx={{ mb: isMobile ? 4.5 : null }}>
              <Typography variant="h6" sx={{ color: toolbarTobAndBottomColor, mb: 1, textTransform: 'uppercase' }}>
                Мы в социальных сетях
              </Typography>
              <Grid container direction="column">
                <Grid item sx={{ mt: 1.5 }}>
                  <Link
                    href="https://www.instagram.com/passage.kg?igsh=bG81MHhoMXN4ZHJ6"
                    color="inherit"
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': { color: '#ad882c' },
                    }}
                  >
                    <InstagramIcon sx={{ mr: 0.7 }} />
                    Passage Матросова
                  </Link>
                </Grid>
                <Grid item sx={{ mt: 1.5 }}>
                  <Link
                    href="https://www.instagram.com/passage.kulatova?igsh=eTNxZjQyd2RxazBq"
                    color="inherit"
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': { color: '#ad882c' },
                    }}
                  >
                    <InstagramIcon sx={{ mr: 0.7 }} />
                    Passage Кулатова
                  </Link>
                </Grid>
                <Grid item sx={{ mt: 1.5 }}>
                  <Link
                    href="https://www.instagram.com/passage.porcelain?igsh=ZG15Z3hwcjY5dHhl"
                    color="inherit"
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': { color: '#ad882c' },
                    }}
                  >
                    <InstagramIcon sx={{ mr: 0.7 }} />
                    Passage Porcelain
                  </Link>
                </Grid>
                <Grid item sx={{ mt: 1.5 }}>
                  <Link
                    href="https://www.facebook.com/share/yGScjeLjZW1CJ5aK/?mibextid=qi2Omg"
                    color="inherit"
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': { color: '#ad882c' },
                    }}
                  >
                    <FacebookIcon sx={{ mr: 0.7 }} />
                    Facebook
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            {/* Адреса магазинов */}
            <Grid item sx={{ mb: isMobile ? 4.5 : null }}>
              <Typography variant="h6" sx={{ color: toolbarTobAndBottomColor, mb: 1, textTransform: 'uppercase' }}>
                Наши адреса
              </Typography>
              <Grid container direction="column">
                <Grid item sx={{ mt: 1.5 }}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <LocationOnIcon sx={{ mr: 0.7 }} />
                    Passage - Матросова, 1/2
                  </Typography>
                </Grid>
                <Grid item sx={{ mt: 1.5 }}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <LocationOnIcon sx={{ mr: 0.7 }} />
                    Passage - Кулатова, 8 — 2 этаж
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Контактные телефоны */}
            <Grid item sx={{ mb: isMobile ? 4.5 : null }}>
              <Typography variant="h6" sx={{ color: toolbarTobAndBottomColor, mb: 1, textTransform: 'uppercase' }}>
                Контакты
              </Typography>
              <Grid container direction="column">
                <Grid item sx={{ mt: 1.5 }}>
                  <Link
                    href="tel:+996997100500"
                    color="inherit"
                    underline="none"
                    onClick={() => handlePhoneClick('+996997100500')}
                    sx={{
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      '&:hover': { color: '#ad882c' },
                    }}
                  >
                    <CallIcon sx={{ mr: 0.7 }} />
                    +996 997 100500
                  </Link>
                </Grid>
                <Grid item sx={{ mt: 1.5 }}>
                  <Link
                    href="tel:+996553100500"
                    color="inherit"
                    underline="none"
                    onClick={() => handlePhoneClick('+996553100500')}
                    sx={{
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      '&:hover': { color: '#ad882c' },
                    }}
                  >
                    <CallIcon sx={{ mr: 0.7 }} />
                    +996 553 100500
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/*<Divider sx={{ border: '1px solid #3f3f3f', position: 'absolute', left: 0, right: 0 }} />*/}

          {/*<Typography sx={{ pt: 1, textAlign: 'center', fontSize: '12px' }}>*/}
          {/*  <Link*/}
          {/*    sx={{*/}
          {/*      textDecoration: 'none',*/}
          {/*      color: '#FFFFFF',*/}
          {/*      '&:hover': { color: '#ad882c' },*/}
          {/*    }}*/}
          {/*    href="https://summary-topaz.vercel.app/"*/}
          {/*    color="inherit"*/}
          {/*    target="_blank"*/}
          {/*    rel="noopener noreferrer"*/}
          {/*  >*/}
          {/*    Разработчик проекта: Маркелов Артем*/}
          {/*  </Link>*/}
          {/*</Typography>*/}
        </Container>
      </AppBar>
    </Box>
  );
};

export default Footer;
