import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import logo from '../../../assets/images/logoAbout/cascade.svg';
import imgHeader from '../../../assets/images/logoAbout/cascade/1.jpg';
import img1 from '../../../assets/images/logoAbout/cascade/6.jpg'; // Завод
import img2 from '../../../assets/images/logoAbout/cascade/3.jpg'; // Унитаз
import img4 from '../../../assets/images/logoAbout/cascade/4.jpg'; // Раковина
import img3 from '../../../assets/images/logoAbout/cascade/5.jpg'; // Производство / печи

const Cascade = () => {
  return (
    <Box>
      <Box sx={{ textAlign: 'center' }}>
        <Box
          component="img"
          src={logo}
          alt="Cascade Logo"
          sx={{
            width: '350px',
            height: 'auto',
            '@media (max-width:600px)': {
              width: '80%',
            },
          }}
        />
      </Box>
      <Box component="img" src={imgHeader} alt="Cascade Header" sx={{ width: '100%', height: 'auto' }} />
      <Box sx={{ p: 4 }}>
        {/* Завод */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Typography variant="h4" gutterBottom>
              CASCADE
            </Typography>
            <Typography variant="body1" textTransform={'uppercase'}>
              Завод CASCADE занимает площадь 60 000 м² и специализируется на производстве унитазов, раковин и продукции
              для общественных ванных комнат. Современные технологии и мощная производственная база обеспечивают высокое
              качество и стабильные поставки.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Box
              component="img"
              src={img1}
              alt="Производство CASCADE"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </Grid>
        </Grid>

        {/* Унитазы */}
        <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
            <Box
              component="img"
              src={img2}
              alt="Унитазы CASCADE"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
            <Typography variant="body1" fontWeight={'bolder'} gutterBottom textTransform={'uppercase'}>
              Эргономичные унитазы CASCADE
            </Typography>
            <Typography variant="body1" textTransform={'uppercase'}>
              Унитазы CASCADE разработаны с учётом гигиены и комфорта. Система смыва 360° обеспечивает равномерное и
              эффективное обмывание чаши. Гладкая глазурованная поверхность препятствует накоплению загрязнений, а
              надёжные материалы гарантируют долговечность и простоту в обслуживании.
            </Typography>
          </Grid>
        </Grid>

        {/* Раковины */}
        <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={8} order={{ xs: 1, md: 1 }}>
            <Typography variant="h4" gutterBottom textTransform={'uppercase'}>
              Раковины из прочного фарфора
            </Typography>
            <Typography variant="body1" textTransform={'uppercase'}>
              Прочные, гладкие и устойчивые к загрязнениям, раковины CASCADE идеально вписываются в любой интерьер. Они
              просты в монтаже и уходе, а высококачественная глазурь обеспечивает длительную эксплуатацию без потери
              внешнего вида.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} order={{ xs: 2, md: 2 }}>
            <Box
              component="img"
              src={img4}
              alt="Раковины CASCADE"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </Grid>
        </Grid>

        {/* Производственный процесс */}
        <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={8} order={{ xs: 1, md: 1 }}>
            <Box
              component="img"
              src={img3}
              alt="Производственные технологии CASCADE"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} order={{ xs: 2, md: 2 }}>
            <Typography variant="h6" gutterBottom textTransform={'uppercase'}>
              Современное производство
            </Typography>
            <Typography variant="body1" textTransform={'uppercase'}>
              В производственный процесс входят: цех по подготовке фарфоровой глины, литейный участок и туннельные печи
              с компьютеризированным управлением. Благодаря точному контролю температуры и давления обеспечивается
              прочность, идеальная форма и стабильное качество каждой единицы продукции.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Cascade;
