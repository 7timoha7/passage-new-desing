import React, { useEffect } from 'react';
import { Box, Divider, Grid, Link, Paper, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';

declare global {
  interface Window {
    DG?: any;
  }
}

const handlePhoneClick = (phoneNumber: string) => {
  if (typeof window.ym !== 'undefined') {
    window.ym(95546639, 'reachGoal', 'phone_click');
  }
  window.location.href = `tel:${phoneNumber}`;
};

const ContactsPage = () => {
  useEffect(() => {
    const apiKey = 'YOUR_API_KEY';

    const loadMap = (id: string, center: number[], popupContent: string, link: string) => {
      window.DG.then(() => {
        const map = window.DG.map(id, {
          center: center,
          zoom: 17,
        });

        const popup = window.DG.popup(center).setContent(
          `${popupContent}<br><a href="${link}" target="_blank" rel="noopener noreferrer">Открыть в 2ГИС</a>`,
        );

        window.DG.marker(center).addTo(map).bindPopup(popup).openPopup();
      });
    };

    const script = document.createElement('script');
    script.src = `https://maps.api.2gis.ru/2.0/loader.js?key=${apiKey}`;
    script.async = true;
    script.onload = () => {
      loadMap(
        'map1',
        [42.864777, 74.630775],
        `<strong>Passage - Матросова, 1/2</strong><br>ПН-СБ: 09:00 - 18:00<br>ВС: 10:00 - 15:00<br><strong>Телефоны:</strong><br><a href="tel:+996997100500">0 997 100 500</a><br><a href="tel:+996553100500">0 553 100 500</a>`,
        'https://2gis.kg/bishkek/firm/70000001059206763?m=74.630806%2C42.86478%2F17',
      );

      loadMap(
        'map2',
        [42.859199, 74.619065],
        `<strong>Passage - Кулатова, 8 — 2 этаж</strong><br>ПН-СБ: 09:00 - 18:00<br>ВС: 10:00 - 16:00<br><strong>Телефоны:</strong><br><a href="tel:+996997100500">0 997 100 500</a><br><a href="tel:+996553100500">0 553 100 500</a>`,
        'https://2gis.kg/bishkek/firm/70000001061184205?m=74.619007%2C42.859134%2F17',
      );
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const renderContactBlock = (
    title: string,
    schedule: { weekday: string; weekend: string },
    phones: string[],
    mapId: string,
  ) => (
    <Box sx={{ p: 2, width: '100%' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon sx={{ color: '#ad882c', mr: 1 }} />
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        График работы:
      </Typography>
      <Typography sx={{ fontSize: '15px' }}>{schedule.weekday}</Typography>
      <Typography sx={{ fontSize: '15px' }}>{schedule.weekend}</Typography>

      <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
        Телефоны:
      </Typography>
      {phones.map((phone) => (
        <Link
          key={phone}
          href={`tel:${phone}`}
          onClick={() => handlePhoneClick(phone)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 0.5,
            color: '#000000',
            fontSize: '15px',
            textDecoration: 'none',
            '&:hover': {
              color: '#ad882c',
            },
          }}
        >
          <CallIcon sx={{ mr: 1, color: '#ad882c' }} />
          {phone}
        </Link>
      ))}

      <Paper
        id={mapId}
        sx={{
          width: '100%',
          height: ['350px', '400px', '500px'],
          mt: 2,
          borderRadius: 2,
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        КОНТАКТЫ
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {renderContactBlock(
            'Passage - Матросова, 1/2',
            { weekday: 'ПН-СБ: 09:00 - 18:00', weekend: 'ВС: 10:00 - 15:00' },
            ['+996997100500', '+996553100500'],
            'map1',
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderContactBlock(
            'Passage - Кулатова, 8 — 2 этаж',
            { weekday: 'ПН-СБ: 09:00 - 18:00', weekend: 'ВС: 10:00 - 16:00' },
            ['+996997100500', '+996553100500'],
            'map2',
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactsPage;
