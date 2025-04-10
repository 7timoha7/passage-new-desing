import React from 'react';
import { Box, Typography } from '@mui/material';

const Warranty = () => {
  return (
    <>
      <Typography sx={{ mt: '30px' }} variant="h4">
        ГАРАНТИЯ
      </Typography>
      <Box sx={{ p: 3, mt: 2, mb: 2 }}>
        <Typography variant="body1" paragraph>
          Добро пожаловать в наш шоурум! Мы предлагаем продукцию проверенных брендов — <strong>RAK</strong>,{' '}
          <strong>CASCADE</strong>, <strong>VITRA</strong> и <strong>OVERLAND</strong>. У нас вы найдёте всё для
          комфорта, уюта и функциональности — <strong>керамогранит</strong>, <strong>сантехнику</strong>,{' '}
          <strong>аксессуары</strong>, <strong>посуду</strong> и многое другое.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Гарантийные сроки
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          <strong>RAK:</strong>
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 3 }}>
          <li>Инсталляции — 10 лет</li>
          <li>Смесители — 10 лет</li>
          <li>Сантехника — 5 лет</li>
          <li>Аксессуары — 2 года</li>
          <li>Плиты — 1 год</li>
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          <strong>CASCADE:</strong>
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 3 }}>
          <li>Инсталляции — 7 лет</li>
          <li>Сантехника — 4 года</li>
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          <strong>Прочая продукция:</strong>
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 3 }}>
          <li>Джакузи — 2 года</li>
          <li>Фильтры — 1 год</li>
        </Typography>

        <Typography variant="body1" paragraph sx={{ mt: 3 }}>
          Мы уверены в качестве представленной продукции и предлагаем честные гарантийные условия от производителей. При
          любых вопросах наша команда всегда готова помочь.
        </Typography>

        <Typography variant="body1" paragraph>
          Посетите наш шоурум, выберите подходящие решения для дома и будьте уверены — качество подкреплено гарантией.
        </Typography>
      </Box>
    </>
  );
};

export default Warranty;
