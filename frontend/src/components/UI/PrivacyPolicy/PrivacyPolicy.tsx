import React from 'react';
import { Container, Divider, Typography } from '@mui/material';

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Политика конфиденциальности
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="body1" paragraph>
        Настоящая политика конфиденциальности регулирует порядок обработки и защиты персональных данных пользователей
        сайта, принадлежащего ОсОО «Пассаж», расположенного в городе Бишкек.
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        1. Сбор персональных данных
      </Typography>
      <Typography variant="body1" paragraph>
        Регистрация на сайте не требуется. При оформлении заказа мы собираем минимальный объем данных, необходимых для
        доставки:
      </Typography>
      <ul>
        <li>
          <Typography>Имя</Typography>
        </li>
        <li>
          <Typography>Номер телефона</Typography>
        </li>
        <li>
          <Typography>Адрес доставки</Typography>
        </li>
      </ul>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        2. Обработка и хранение данных
      </Typography>
      <Typography variant="body1" paragraph>
        Персональные данные используются исключительно для обработки заказов и организации доставки. Данные не
        передаются третьим лицам. Доставка осуществляется нашей собственной службой.
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        3. Платежи
      </Typography>
      <Typography variant="body1" paragraph>
        Оплата на сайте не производится. Все расчёты осуществляются при получении товара.
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        4. Используемые технологии
      </Typography>
      <Typography variant="body1" paragraph>
        На сайте используются системы сбора статистики Google Analytics и Яндекс.Метрика, которые помогают нам улучшать
        качество обслуживания. Эти сервисы могут использовать cookies, но не позволяют идентифицировать конкретного
        пользователя.
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        5. Хранение и безопасность
      </Typography>
      <Typography variant="body1" paragraph>
        Данные хранятся на серверах, размещённых на территории Кыргызской Республики (город Бишкек), на надёжном местном
        хостинге. Мы принимаем все необходимые меры для защиты информации от несанкционированного доступа.
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        6. Связь с нами
      </Typography>
      <Typography variant="body1">
        Если у вас возникли вопросы по поводу обработки данных, вы можете связаться с нами по телефону, указанному на
        сайте.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
