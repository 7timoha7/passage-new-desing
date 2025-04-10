import React from 'react';
import { Box, Typography } from '@mui/material';

const Installment = () => {
  return (
    <>
      <Typography sx={{ mt: '30px', mb: '20px' }} variant="h4">
        РАСРОЧКА
      </Typography>
      <Box
        sx={{
          p: 3,
          mt: 2,
          mb: 2,
        }}
      >
        <Typography variant="body1" paragraph>
          Добро пожаловать в Passage! Мы рады предложить вам удобные условия рассрочки на всю продукцию нашего магазина.
        </Typography>
        <Typography variant="body1" paragraph>
          Воспользуйтесь нашими гибкими условиями рассрочки и сделайте покупки без лишних затрат. Мы предлагаем:
        </Typography>
        <Typography variant="body1" component="ul" paragraph>
          <li>Без первоначального взноса</li>
          <li>Проценты по рассрочке - 0%</li>
          <li>Удобный график платежей</li>
          <li>Быстрое оформление</li>
        </Typography>
        <Typography variant="body1" paragraph>
          Не упустите возможность обустроить ваш дом с качественной продукцией KLUDI RAK и оплачивать покупку частями!
        </Typography>
        <Typography variant="body1" paragraph>
          Посетите наш магазин Passage и узнайте больше о наших условиях рассрочки. Наши консультанты всегда готовы
          помочь вам с оформлением и ответить на все ваши вопросы.
        </Typography>
        <Typography variant="body1" paragraph>
          Покупайте сейчас, платите позже - это легко и удобно с Passage!
        </Typography>
      </Box>
    </>
  );
};

export default Installment;
