import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Slider, { Settings } from 'react-slick';
import { selectBasket } from '../Basket/basketSlice';
import { ProductType } from '../../types';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Spinner from '../../components/UI/Spinner/Spinner';
import ProductCard from '../Products/components/ProductCard';
import { fetchProductsSale } from './ProductsSaleThunks';
import { selectFetchProductsSaleLoading, selectProductsSale } from './ProductsSaleSlice';

const ProductsSale = () => {
  const dispatch = useAppDispatch();
  const sliderRef = useRef<Slider>(null);
  const basket = useAppSelector(selectBasket);
  const productsSale = useAppSelector(selectProductsSale);
  const loadingProductsSale = useAppSelector(selectFetchProductsSaleLoading);

  useEffect(() => {
    dispatch(fetchProductsSale());
  }, [dispatch]);

  // Проверьте, что bestsellersProduct - это массив
  if (!Array.isArray(productsSale)) {
    // Обработайте случай, когда bestsellersProduct не является массивом
    return null;
  }

  const sliderSettings: Settings = {
    dots: false, // Отключаем точки (индикаторы текущего слайда)
    arrows: false, // Отключаем стандартные стрелки
    infinite: true, // Бесконечная прокрутка слайдов
    slidesToShow: 3, // Количество отображаемых слайдов за один раз
    slidesToScroll: 1, // Количество слайдов, которые прокручиваются за один раз
    autoplay: true, // Включаем автопрокрутку
    autoplaySpeed: 2000, // Интервал между автоматической сменой слайдов в миллисекундах
    variableWidth: true, // Разрешаем переменную ширину слайдов, чтобы они могли занимать разное пространство
    centerMode: true, // Разрешаем режим центрирования, где активный слайд всегда по центру
    centerPadding: '10px', // Отступ от края контейнера для активного слайда
    adaptiveHeight: true, // Адаптивная высота слайда под контент
    speed: 500, // Скорость анимации переключения слайдов в миллисекундах
    initialSlide: 0, // Номер начального слайда
    swipeToSlide: true, // Позволяет переключаться по слайдам при свайпе
    focusOnSelect: true, // Слайд будет центрироваться при клике
    draggable: true, // Включает/отключает перетаскивание слайдов мышью (для десктопа)
    responsive: [
      { breakpoint: 3000, settings: { variableWidth: false, slidesToShow: 4, centerMode: false } },
      { breakpoint: 1800, settings: { variableWidth: false, slidesToShow: 4, centerMode: false } },
      { breakpoint: 1420, settings: { variableWidth: false, slidesToShow: 4, centerMode: false } },
      { breakpoint: 1300, settings: { variableWidth: false, slidesToShow: 3, centerMode: false } },
      { breakpoint: 1080, settings: { variableWidth: false, slidesToShow: 2, centerMode: false } },
      { breakpoint: 800, settings: { variableWidth: false, slidesToShow: 2, centerMode: false } },
      { breakpoint: 388, settings: { variableWidth: false, slidesToShow: 1, centerMode: false } },
    ],
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const indicator = (item: ProductType) => {
    if (basket && item) {
      return basket.items.some((itemBasket) => itemBasket.product.goodID === item.goodID);
    } else {
      return false;
    }
  };
  return (
    <>
      {productsSale.length < 1 ? null : (
        <div
          style={{
            // border: ProductsNewsBorderStyles,
            borderRadius: '10px',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <style>
            {`
        .slick-track {
          display: flex !important;
          align-items: stretch;
        }

        .slick-slide {
          display: flex !important;
          height: auto !important;
          padding-bottom: 10px;
          padding-top: 10px;
          padding-left: 7px;      
        }

        .slick-list {
          overflow: hidden;          
        }
      `}
          </style>

          <Grid container justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 3 }}>
            <Typography variant="h4">РАСПРОДАЖА</Typography>
            <Grid item></Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <IconButton
                    sx={{
                      color: '#efb748', // Цвет кнопки
                      '&:hover': {
                        color: '#ab944d', // Цвет кнопки при наведении
                      },
                    }}
                    onClick={handlePrev}
                  >
                    <ArrowBackIosNewIcon fontSize={'large'} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    sx={{
                      color: '#efb748', // Цвет кнопки
                      '&:hover': {
                        color: '#ab944d', // Цвет кнопки при наведении
                      },
                    }}
                    onClick={handleNext}
                  >
                    <ArrowForwardIosIcon fontSize={'large'} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {loadingProductsSale ? (
            <Spinner />
          ) : (
            <>
              {productsSale.length < 2 ? (
                <Box sx={{ p: 2 }}>
                  <ProductCard indicator={indicator(productsSale[0])} product={productsSale[0]} />
                </Box>
              ) : (
                <Slider ref={sliderRef} {...sliderSettings}>
                  {productsSale.map((item) => (
                    <ProductCard indicator={indicator(item)} product={item} key={item._id} />
                  ))}
                </Slider>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductsSale;
