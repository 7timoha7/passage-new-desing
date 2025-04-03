import React, { useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import noImage from '../../../assets/images/no_image.jpg';
import { ProductType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { placeHolderImg } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { selectFetchFavoriteProductsOneLoading, selectUser } from '../../users/usersSlice';
import { selectBasket, selectBasketUpdateLoading } from '../../Basket/basketSlice';
import { fetchBasket, updateBasket } from '../../Basket/basketThunks';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { changeFavorites, reAuthorization } from '../../users/usersThunks';
import { getFavoriteProducts } from '../productsThunks';
import { LoadingButton } from '@mui/lab';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ProductGallery from './ProductGallery';
import * as isoCountries from 'i18n-iso-countries';
import CountryFlag from 'react-country-flag';
import { setProductsForID } from '../../ProductsFor/productsForSlice';
import { btnFullCardColor, priceColorFullCard, priceNameColorFullCard } from '../../../styles';

interface Props {
  product: ProductType;
}

const ProductFullCard: React.FC<Props> = ({ product }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const basket = useAppSelector(selectBasket);
  const storedBasketId = localStorage.getItem('sessionKey');
  const addBasketLoading = useAppSelector(selectBasketUpdateLoading);
  const favoriteLoading = useAppSelector(selectFetchFavoriteProductsOneLoading);

  isoCountries.registerLocale(require('i18n-iso-countries/langs/ru.json'));
  const countryName = isoCountries.getName(product.originCountry, 'ru');

  let isoCountryCode: string | undefined = '';

  if (countryName != null) {
    isoCountryCode = isoCountries.getAlpha2Code(countryName, 'ru');
  }

  const indicator = (item: ProductType) => {
    if (basket && item) {
      return basket?.items?.some((itemBasket) => itemBasket.product.goodID === item.goodID);
    } else {
      return false;
    }
  };

  const handleAddToCart = async () => {
    if (storedBasketId) {
      await dispatch(
        updateBasket({
          sessionKey: storedBasketId,
          product_id: product.goodID,
          action: 'increase',
        }),
      );
      await dispatch(fetchBasket(storedBasketId));
    } else if (user) {
      await dispatch(
        updateBasket({
          sessionKey: '1',
          product_id: product.goodID,
          action: 'increase',
        }),
      );
      await dispatch(fetchBasket('1'));
    }
  };

  const onClickFavorite = async (id: string) => {
    if (!favorite) {
      await dispatch(changeFavorites({ addProduct: id }));
      await dispatch(reAuthorization());
    } else {
      await dispatch(changeFavorites({ deleteProduct: id }));
      await dispatch(reAuthorization());
      await dispatch(getFavoriteProducts(1));
    }
  };

  const favorite =
    (user?.role === 'user' || user?.role === 'director' || user?.role === 'admin') &&
    user.favorites.includes(product.goodID);

  useEffect(() => {
    dispatch(setProductsForID(product.ownerID));
  }, [dispatch, product.ownerID]);

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ maxWidth: '100%', margin: 'auto', position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClickFavorite(product.goodID);
          }}
        >
          {user &&
            user.isVerified &&
            (user.role === 'user' || user.role === 'director' || user.role === 'admin') &&
            (favorite ? (
              favoriteLoading === product.goodID ? (
                <CircularProgress size={'20px'} color="error" />
              ) : (
                <FavoriteIcon color="error" />
              )
            ) : favoriteLoading === product.goodID ? (
              <CircularProgress size={'20px'} color="error" />
            ) : (
              <FavoriteBorderIcon />
            ))}
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '40% 60%' }, // 40% картинка, 60% инфа
            gap: 2,
          }}
        >
          {/* Левая часть - изображение */}
          <Grid item>
            <Box>
              {product.images.length ? (
                <ProductGallery images={product.images} />
              ) : (
                <LazyLoadImage
                  src={noImage}
                  alt={product.name}
                  width="100%"
                  height="200px"
                  effect="blur"
                  placeholderSrc={placeHolderImg}
                  style={{ objectFit: 'contain' }}
                />
              )}
            </Box>
          </Grid>

          {/* Правая часть - информация */}
          <Grid
            item
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Описание */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
            </Box>

            {/* Кнопки и цена*/}
            <Box sx={{ background: 'rgba(245,245,245,0.73)', borderRadius: '10px', padding: '18px' }}>
              <Box sx={{ mb: 2 }}>
                {product.priceSale > 0 && (
                  <Box>
                    <Typography sx={{ color: priceColorFullCard, mt: 1, textDecoration: 'line-through' }}>
                      {product.priceSale + ' сом'}
                      {product.type === 'Керамогранит' ? (
                        <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}> - за плитку</span>
                      ) : (
                        ''
                      )}
                      {product.type === 'Ковролин' ? (
                        <span
                          style={{
                            color: priceNameColorFullCard,
                            fontSize: '15px',
                          }}
                        >
                          {' '}
                          - минимально за {product.size} м²
                        </span>
                      ) : (
                        ''
                      )}
                    </Typography>

                    {product.type === 'Керамогранит' &&
                    (product.measureName === 'м2' || product.measureName === 'm2') ? (
                      <Typography sx={{ color: priceColorFullCard, textDecoration: 'line-through' }}>
                        {product.priceOriginalSale + ' сом'}
                        <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}> - за м²</span>
                      </Typography>
                    ) : null}

                    {product.type === 'Ковролин' ? (
                      <Typography sx={{ color: priceColorFullCard, textDecoration: 'line-through' }}>
                        {product.priceOriginalSale + ' сом'}
                        <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}> - за м²</span>
                      </Typography>
                    ) : null}
                  </Box>
                )}

                <Box>
                  <Typography sx={{ color: priceColorFullCard, mt: 1 }}>
                    {product.price + ' сом'}
                    {product.type === 'Керамогранит' ? (
                      <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}> - за плитку</span>
                    ) : (
                      ''
                    )}
                    {product.type === 'Ковролин' ? (
                      <span
                        style={{
                          color: priceNameColorFullCard,
                          fontSize: '15px',
                        }}
                      >
                        {' '}
                        - минимально за {product.size} м²
                      </span>
                    ) : (
                      ''
                    )}
                  </Typography>

                  {product.type === 'Керамогранит' && (product.measureName === 'м2' || product.measureName === 'm2') ? (
                    <Typography sx={{ color: priceColorFullCard }}>
                      {product.priceOriginal + ' сом'}
                      <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}> - за м²</span>
                    </Typography>
                  ) : null}

                  {product.type === 'Ковролин' ? (
                    <Typography sx={{ color: priceColorFullCard }}>
                      {product.priceOriginal + ' сом'}
                      <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}> - за м²</span>
                    </Typography>
                  ) : null}
                </Box>
              </Box>

              <Grid container gap={2}>
                <Grid item>
                  <Tooltip title={indicator(product) ? 'Товар уже в корзине' : 'Добавить в корзину'} arrow>
                    <LoadingButton
                      onClick={handleAddToCart}
                      disabled={indicator(product)}
                      variant="outlined"
                      endIcon={<AddShoppingCartIcon />}
                      sx={btnFullCardColor}
                      loading={addBasketLoading === product.goodID}
                    >
                      {indicator(product) ? 'В корзине' : 'Добавить в корзину'}
                    </LoadingButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Button sx={btnFullCardColor} onClick={() => navigate('/basket')} variant="outlined">
                    Перейти в корзину
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Информация о товаре
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Описание:
                      </TableCell>
                      <TableCell>{product.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Единицы измерения:
                      </TableCell>
                      <TableCell>{product.measureName}</TableCell>
                    </TableRow>
                    {product.size && product.thickness && (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Размер:
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant={'caption'}>Ширина/высота(см): {product.size}</Typography>
                          </Box>
                          <Box>
                            <Typography variant={'caption'}>Толщина(мм): {product.thickness}</Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Наличие:
                      </TableCell>
                      <TableCell>
                        {user && (user.role === 'admin' || user.role === 'director') ? (
                          <>
                            {product.quantity.map((stock, index) => (
                              <Box key={stock.stockID + index}>
                                <Typography variant={'caption'}>
                                  {stock.name}: <span style={{ fontWeight: 'bold' }}>{stock.quantity}</span>
                                </Typography>
                              </Box>
                            ))}
                          </>
                        ) : (
                          <Typography variant={'caption'} color={'green'}>
                            В наличии
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    {product.originCountry && (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Страна производитель:
                        </TableCell>
                        <TableCell>
                          <Grid container spacing={2} alignItems={'center'}>
                            <Grid item sx={{ mt: '3px' }}>
                              {countryName && <Typography>{countryName}</Typography>}
                            </Grid>
                            <Grid item>
                              {isoCountryCode && (
                                <CountryFlag
                                  countryCode={isoCountryCode}
                                  svg
                                  style={{
                                    width: '100%',
                                    maxWidth: '35px',
                                    height: 'auto',
                                    borderRadius: '3px',
                                  }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Артикул:
                      </TableCell>
                      <TableCell>{product.article}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductFullCard;
