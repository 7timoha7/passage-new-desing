import React, { useEffect } from 'react';
import { ImageGallery } from 'react-image-grid-gallery';
import { Box, CardMedia, Grid, Typography, useMediaQuery } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks';
import {
  selectDesignerDesc,
  selectDesignerDescLoading,
  selectDesignerGallery,
  selectDesignerGalleryLoading,
  selectDesignerPdf,
  selectDesignerPdfLoading,
} from './designersSlice';
import { fetchDesignerDesc, fetchDesignerGallery, fetchDesignerPdf } from './designersThunks';
import Spinner from '../../../../../../Spinner/Spinner';
import { selectUser } from '../../../../../../../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../../../../../../../constants';

const Designers = () => {
  const dispatch = useAppDispatch();
  const desc = useAppSelector(selectDesignerDesc);
  const gallery = useAppSelector(selectDesignerGallery);
  const pdf = useAppSelector(selectDesignerPdf);
  const fetchDesk = useAppSelector(selectDesignerDescLoading);
  const fetchGallery = useAppSelector(selectDesignerGalleryLoading);
  const fetchPdf = useAppSelector(selectDesignerPdfLoading);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDesignerDesc());
    dispatch(fetchDesignerGallery());
    dispatch(fetchDesignerPdf());
  }, [dispatch]);

  // const downloadFile = async (url: string | URL | Request, filename: string) => {
  //   try {
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     const link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.setAttribute('download', filename);
  //     document.body.appendChild(link);
  //     link.click();
  //     if (link.parentNode) {
  //       link.parentNode.removeChild(link);
  //     } else {
  //       document.body.removeChild(link); // На случай, если link.parentNode по-прежнему null
  //     }
  //   } catch (error) {
  //     console.error('Error downloading the file:', error);
  //   }
  // };

  return (
    <>
      <Typography sx={{ mt: '30px' }} variant="h4">
        ДИЗАЙНЕРАМ
      </Typography>

      <Box
        sx={{
          p: 3,
          mt: 2,
          mb: 2,
        }}
      >
        <Box>
          {fetchDesk ? (
            <Spinner />
          ) : (
            <>
              {desc.length &&
                desc.map((item) => {
                  return (
                    <Box key={item._id} mb={4}>
                      <Typography mb={1} variant={'h5'} textTransform={'uppercase'}>
                        {item.title}
                      </Typography>
                      <Typography fontSize={'18px'} mb={2}>
                        {item.desc}
                      </Typography>
                    </Box>
                  );
                })}
            </>
          )}
        </Box>
        <Box borderTop={'3px solid gray'}>
          <Typography mt={3} mb={3} fontSize={'25px'}>
            ГАЛЕРЕЯ
          </Typography>
          {fetchGallery ? (
            <Spinner />
          ) : (
            <>
              {gallery.length && (
                <ImageGallery
                  imagesInfoArray={gallery
                    .filter((item) => item.alt) // Фильтруем элементы без alt
                    .map((item) => ({
                      key: item._id,
                      alt: item.alt,
                      caption: item.caption,
                      src: apiURL + '/' + item.image,
                    }))}
                  columnCount={'auto'}
                  columnWidth={230}
                  gapSize={5}
                />
              )}
            </>
          )}
        </Box>
        <Box mt={3} borderTop={'3px solid gray'}>
          <Typography mb={4} mt={4} variant={'h5'}>
            СКАЧАТЬ КОЛЕКЦИИ В PDF
          </Typography>

          <Box>
            {fetchPdf ? (
              <Spinner />
            ) : (
              <Grid container spacing={isSmallScreen ? 1.5 : 4} mt={2} mb={3} justifyContent={'center'}>
                {pdf.length &&
                  pdf.map((item) => {
                    return (
                      <Grid item key={item._id}>
                        <Card
                          key={item._id}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                            width: 300,
                            '@media (max-width:600px)': {
                              width: '250px',
                            },
                            '@media (max-width:480px)': {
                              width: '100%',
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="contained"
                            image={apiURL + '/' + item.img}
                            alt={item.title}
                          />
                          <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="body1" color="black" textTransform={'uppercase'}>
                              {item.title}
                            </Typography>
                          </CardContent>
                          <CardContent sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Button
                              color={'warning'}
                              variant={'contained'}
                              size={'small'}
                              sx={{
                                fontSize: 'small',
                                mt: 1,
                                backgroundColor: '#c7ac79', // Цвет кнопки
                                '&:hover': {
                                  backgroundColor: '#a18b49', // Цвет кнопки при наведении
                                  color: '#ffffff',
                                },
                                '&:active': {
                                  backgroundColor: '#948145', // Цвет кнопки при наведении
                                  color: '#ffffff',
                                },
                              }}
                              component="a"
                              href={apiURL + item.pdf}
                              download
                              // onClick={() => downloadFile(apiURL + item.pdf, item.title)}
                            >
                              ЗАГРУЗИТЬ PDF
                              <DownloadIcon sx={{ ml: 1 }} />
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            )}
          </Box>
        </Box>
      </Box>

      {user && user.role === 'admin' && (
        <Box textAlign={'center'} mt={3}>
          <Button
            onClick={() => navigate('/designersForm')}
            color={'warning'}
            variant={'contained'}
            sx={{
              fontSize: 'small',
              mt: 1,
              backgroundColor: '#c7ac79', // Цвет кнопки
              '&:hover': {
                backgroundColor: '#a18b49', // Цвет кнопки при наведении
                color: '#ffffff',
              },
              '&:active': {
                backgroundColor: '#948145', // Цвет кнопки при наведении
                color: '#ffffff',
              },
            }}
          >
            Редактировать раздел
          </Button>
        </Box>
      )}
    </>
  );
};

export default Designers;
