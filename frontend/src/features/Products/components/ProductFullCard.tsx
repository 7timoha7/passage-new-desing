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
  const isoCountryCode = countryName ? isoCountries.getAlpha2Code(countryName, 'ru') : undefined;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const indicator = (item: ProductType) => {
    return basket?.items?.some((itemBasket) => itemBasket.product.goodID === item.goodID) ?? false;
  };

  const handleAddToCart = async () => {
    const sessionKey = storedBasketId || '1';
    await dispatch(updateBasket({ sessionKey, product_id: product.goodID, action: 'increase' }));
    await dispatch(fetchBasket(sessionKey));
  };

  const onClickFavorite = async (id: string) => {
    if (!favorite) {
      await dispatch(changeFavorites({ addProduct: id }));
    } else {
      await dispatch(changeFavorites({ deleteProduct: id }));
      await dispatch(getFavoriteProducts(1));
    }
    await dispatch(reAuthorization());
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
          sx={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            onClickFavorite(product.goodID);
          }}
        >
          {user?.isVerified &&
            ['user', 'director', 'admin'].includes(user.role) &&
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
            gridTemplateColumns: { xs: '1fr', md: '40% 60%' },
            gap: 2,
          }}
        >
          {/* Левая часть */}
          <Grid item>
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
          </Grid>

          {/* Правая часть */}
          <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
            </Box>

            {/* Цена и кнопки */}
            <Box sx={{ background: 'rgba(245,245,245,0.73)', borderRadius: '10px', padding: '18px' }}>
              <Box sx={{ mb: 2 }}>
                {product.priceSale > 0 && (
                  <>
                    <Typography sx={{ color: priceColorFullCard, textDecoration: 'line-through' }}>
                      {product.priceSale} сом
                      {product.type === 'Керамогранит' && (
                        <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}> - за плитку</span>
                      )}
                      {product.type === 'Ковролин' && (
                        <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}>
                          {' '}
                          - минимально за {product.size} м²
                        </span>
                      )}
                    </Typography>
                    {(product.type === 'Ковролин' ||
                      (product.type === 'Керамогранит' &&
                        (product.measureName === 'м2' || product.measureName === 'm2'))) && (
                      <Typography sx={{ color: priceColorFullCard, textDecoration: 'line-through' }}>
                        {product.priceOriginalSale} сом
                        <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}> - за м²</span>
                      </Typography>
                    )}
                  </>
                )}

                <Typography sx={{ color: priceColorFullCard, mt: 1 }}>
                  {product.price} сом
                  {product.type === 'Керамогранит' && (
                    <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}> - за плитку</span>
                  )}
                  {product.type === 'Ковролин' && (
                    <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}>
                      {' '}
                      - минимально за {product.size} м²
                    </span>
                  )}
                </Typography>

                {(product.type === 'Ковролин' ||
                  (product.type === 'Керамогранит' &&
                    (product.measureName === 'м2' || product.measureName === 'm2'))) && (
                  <Typography sx={{ color: priceColorFullCard }}>
                    {product.priceOriginal} сом
                    <span style={{ color: priceNameColorFullCard, fontSize: '15px' }}> - за м²</span>
                  </Typography>
                )}
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

            {/* Таблица характеристик */}
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
                          <Typography variant="caption">Ширина/высота(см): {product.size}</Typography>
                          <br />
                          <Typography variant="caption">Толщина(мм): {product.thickness}</Typography>
                        </TableCell>
                      </TableRow>
                    )}

                    {product.characteristics
                      .filter((item) => {
                        return !(product.size && item.key.trim().toLowerCase() === 'размер');
                      })
                      .map((item) => (
                        <TableRow key={item.key + item.value}>
                          <TableCell component="th" scope="row">
                            {capitalize(item.key.trim())}:
                          </TableCell>
                          <TableCell>{item.value}</TableCell>
                        </TableRow>
                      ))}

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Наличие:
                      </TableCell>
                      <TableCell>
                        {user && ['admin', 'director'].includes(user.role) ? (
                          <>
                            {product.quantity.map((stock, index) => (
                              <Typography variant="caption" key={stock.stockID + index}>
                                {stock.name}: <strong>{stock.quantity}</strong>
                              </Typography>
                            ))}
                          </>
                        ) : (
                          <Typography variant="caption" color="green">
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
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>{countryName && <Typography>{countryName}</Typography>}</Grid>
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
