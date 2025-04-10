import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Box, CircularProgress, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Spinner from '../../components/UI/Spinner/Spinner';
import { LoadingButton } from '@mui/lab';
import { selectBasket, selectBasketOneLoading, selectBasketUpdateLoading } from './basketSlice';
import { fetchBasket, updateBasket } from './basketThunks';
import { selectUser } from '../users/usersSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { apiURL, placeHolderImg } from '../../constants';
import noImg from '../../assets/images/no_image.jpg';
import { btnBasketColorAdd, btnColorClearBasket, btnPlusBasket, btnPlusBasketHover } from '../../styles';

const BasketPage = () => {
  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const addBasketLoading = useAppSelector(selectBasketUpdateLoading);
  const oneBasketLoading = useAppSelector(selectBasketOneLoading);

  const loadingBasket = () => {
    return !!addBasketLoading;
  };

  const handleUpdateBasket = async (
    product_id: string,
    action: 'increaseToOrder' | 'decreaseToOrder' | 'increase' | 'decrease' | 'remove' | 'removeToOrder',
  ) => {
    if (user) {
      await dispatch(updateBasket({ sessionKey: user._id, product_id, action }));
      await dispatch(fetchBasket(user._id));
    } else if (basket?.session_key) {
      await dispatch(updateBasket({ sessionKey: basket.session_key, product_id, action }));
      await dispatch(fetchBasket(basket.session_key));
    }
  };

  const clearBasket = async (action: 'clear') => {
    if (basket?.session_key) {
      await dispatch(updateBasket({ action: action, sessionKey: basket.session_key, product_id: action }));
      await dispatch(fetchBasket(basket.session_key));
    } else if (user) {
      await dispatch(updateBasket({ action: action, sessionKey: user._id, product_id: action }));
      await dispatch(fetchBasket(user._id));
    }
  };

  const isAddButtonDisabled = (goodID: string) => {
    if (!basket || !basket.items || basket.items.length === 0) {
      return false;
    }

    const item = basket.items.find((item) => item.product.goodID === goodID);

    if (!item || !item.product.quantity) {
      return false;
    }

    const stockQuantities = item.product.quantity.map((quantityItem) => quantityItem.quantity);
    const totalStockQuantity = stockQuantities.reduce((total, quantity) => total + quantity, 0);

    if (item.product.size) {
      const quantityMeters = calculateSquareAreaInSquareMeters(item.product.size) * item.quantity;
      return quantityMeters >= totalStockQuantity;
    } else {
      return item.quantity >= totalStockQuantity;
    }
  };

  const calculateSquareAreaInSquareMeters = (sizeString: string): number => {
    // Проверяем, содержит ли строка символ '*'
    if (sizeString.includes('*')) {
      const [lengthStr, widthStr] = sizeString.split('*');
      const lengthInCentimeters: number = parseInt(lengthStr);
      const widthInCentimeters: number = parseInt(widthStr);
      return (lengthInCentimeters * widthInCentimeters) / (100 * 100);
    } else {
      // Предполагаем, что пришли размеры в метрах
      // Площадь квадрата вычисляется как сторона в квадрате
      return parseFloat(sizeString);
    }
  };

  const textMeters = (quantity: number, metersOne: number) => {
    return (quantity * metersOne).toFixed(2);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>
      {oneBasketLoading ? (
        <Spinner />
      ) : basket?.items?.length ? (
        <Grid container spacing={2}>
          {/* Левая колонка с карточками товаров */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {basket.items.map((item, index) => (
                <Paper key={item.product.goodID + index} sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item onClick={() => navigate('/product/' + item.product.goodID)}>
                      <LazyLoadImage
                        src={item.product.images[0] ? apiURL + '/' + item.product.images[0] : noImg}
                        alt={item.product.name}
                        width="200px"
                        height="200px"
                        style={{ objectFit: 'contain', cursor: 'pointer' }}
                        placeholderSrc={placeHolderImg}
                        effect="blur"
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography
                        variant="body1"
                        gutterBottom
                        onClick={() => navigate('/product/' + item.product.goodID)}
                        sx={{ cursor: 'pointer' }}
                      >
                        Наименование: <strong>{item.product.name}</strong>
                      </Typography>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                        Количество:
                        <Box display="flex" alignItems="center">
                          <IconButton
                            sx={{ p: 0.5, color: btnPlusBasket, '&:hover': { color: btnPlusBasketHover } }}
                            disabled={
                              addBasketLoading === item.product.goodID || isAddButtonDisabled(item.product.goodID)
                            }
                            onClick={() => handleUpdateBasket(item.product.goodID, 'increase')}
                          >
                            {addBasketLoading === item.product.goodID ? (
                              <CircularProgress size={20} color="error" />
                            ) : (
                              <AddCircleOutlineIcon />
                            )}
                          </IconButton>
                          <span>{item.quantity}</span>
                          <IconButton
                            sx={{ p: 0.5 }}
                            disabled={addBasketLoading === item.product.goodID}
                            onClick={() =>
                              item.quantity === 1
                                ? handleUpdateBasket(item.product.goodID, 'remove')
                                : handleUpdateBasket(item.product.goodID, 'decrease')
                            }
                          >
                            {addBasketLoading === item.product.goodID ? (
                              <CircularProgress size={20} color="error" />
                            ) : (
                              <RemoveCircleOutlineIcon style={{ color: 'black' }} />
                            )}
                          </IconButton>
                        </Box>
                      </Box>

                      {item.product.size && (
                        <Box mt={1}>
                          М²:{' '}
                          <Typography fontSize="14px" fontWeight="bold" display="inline">
                            {textMeters(item.quantity, calculateSquareAreaInSquareMeters(item.product.size))}
                          </Typography>
                        </Box>
                      )}

                      {isAddButtonDisabled(item.product.goodID) && (
                        <Box mt={2}>
                          <Typography color="red" variant="caption">
                            Этот товар доступен под заказ. Точную цену и количество уточнит менеджер. Оставьте заявку —
                            мы свяжемся с вами для оформления.
                          </Typography>
                          <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                            <Typography fontSize="0.875rem">Количество под заказ:</Typography>
                            <Box display="flex" alignItems="center">
                              <IconButton
                                sx={{ p: 0.5, color: btnPlusBasket, '&:hover': { color: btnPlusBasketHover } }}
                                disabled={addBasketLoading === item.product.goodID}
                                onClick={() => handleUpdateBasket(item.product.goodID, 'increaseToOrder')}
                              >
                                {addBasketLoading === item.product.goodID ? (
                                  <CircularProgress size={20} color="error" />
                                ) : (
                                  <AddCircleOutlineIcon />
                                )}
                              </IconButton>
                              <span>{item.quantityToOrder}</span>
                              <IconButton
                                sx={{ p: 0.5 }}
                                disabled={addBasketLoading === item.product.goodID || item.quantityToOrder === 0}
                                onClick={() => handleUpdateBasket(item.product.goodID, 'decreaseToOrder')}
                              >
                                {addBasketLoading === item.product.goodID ? (
                                  <CircularProgress size={20} color="error" />
                                ) : (
                                  <RemoveCircleOutlineIcon
                                    style={item.quantityToOrder > 0 ? { color: 'black' } : undefined}
                                  />
                                )}
                              </IconButton>
                            </Box>
                          </Box>
                          {item.product.size && item.quantityToOrder > 0 && (
                            <Box mt={1}>
                              М²:{' '}
                              <Typography fontSize="14px" fontWeight="bold" display="inline">
                                {textMeters(item.quantityToOrder, calculateSquareAreaInSquareMeters(item.product.size))}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      )}

                      <Box mt={2}>Сумма: {(item.product.price * item.quantity).toFixed(2)} сом</Box>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Правая колонка с итогом и кнопками */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: 'sticky',
                top: 100,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                backgroundColor: '#fff',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Общая сумма: {basket.totalPrice} сом
              </Typography>
              <Stack spacing={2}>
                <LoadingButton
                  loading={loadingBasket()}
                  disabled={basket.items.length === 0}
                  onClick={() => navigate('/order')}
                  variant="contained"
                  sx={btnBasketColorAdd}
                >
                  Оформить заказ
                </LoadingButton>
                <LoadingButton
                  loading={loadingBasket()}
                  disabled={basket.items.length === 0}
                  variant="outlined"
                  onClick={() => clearBasket('clear')}
                  sx={btnColorClearBasket}
                >
                  Очистить корзину
                </LoadingButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h5" gutterBottom textAlign="center">
          Нет товаров
        </Typography>
      )}
    </Box>
  );
};

export default BasketPage;
