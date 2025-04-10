import React from 'react';
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { AccessTime, CheckCircleOutline, DirectionsCar, DoorFront, MonetizationOn } from '@mui/icons-material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const Delivery = () => {
  return (
    <>
      <Typography sx={{ mt: '30px' }} variant="h4">
        ДОСТАВКА
      </Typography>
      <Box
        sx={{
          p: 3,
          mt: 2,
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Правила доставки:
        </Typography>
        <Divider />

        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutline />
            </ListItemIcon>
            <ListItemText primary="Бесплатная доставка в пределах города" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <MonetizationOn />
            </ListItemIcon>
            <ListItemText primary="Доставка за городской чертой - 40 сом за километр" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <DirectionsCar />
            </ListItemIcon>
            <ListItemText primary="Доставка с понедельника по субботу" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <DoorFront />
            </ListItemIcon>
            <ListItemText primary="Доставка осуществляется только до подъезда или до ворот" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText primary="Прием заказов на доставку до 15:00, если позже то переносится на следующий рабочий день" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AccessibilityNewIcon />{' '}
            </ListItemIcon>
            <ListItemText primary="Клиенту нужно заранее позаботиться о грузчиках. Водитель не занимается выгрузкой" />
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default Delivery;
