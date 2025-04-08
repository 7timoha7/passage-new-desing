import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
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
    <Box sx={{ m: 2, p: 2 }}>
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        Корзина
      </Typography>
      {oneBasketLoading ? (
        <Spinner />
      ) : (
        <>
          {basket?.items ? (
            <>
              <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                <Table>
                  <TableBody>
                    {basket.items.map((item, index) => (
                      <TableRow key={item.product.goodID + index}>
                        <TableCell sx={{ borderBottom: '4px solid #404040', borderTop: '4px solid #404040' }}>
                          <Grid
                            container
                            spacing={2}
                            onClick={() => navigate('/product/' + item.product.goodID)}
                            sx={{ cursor: 'pointer' }}
                          >
                            <Grid item>
                              <LazyLoadImage
                                src={item.product.images[0] ? apiURL + '/' + item.product.images[0] : noImg}
                                alt={item.product.name}
                                width="40px"
                                height="40px"
                                style={{ objectFit: 'contain' }}
                                placeholderSrc={placeHolderImg}
                                effect="blur"
                              />
                            </Grid>

                            <Grid item>
                              <Typography variant="body1" gutterBottom>
                                Наименование: <span style={{ fontWeight: 'bold' }}>{item.product.name}</span>
                              </Typography>
                            </Grid>
                          </Grid>

                          <Table size="small">
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                  colSpan={2} // объединяем ячейки в одну строку
                                >
                                  Количество:
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <IconButton
                                      sx={{
                                        p: 0.5,
                                        color: btnPlusBasket, // Цвет контура кнопки

                                        '&:hover': {
                                          color: btnPlusBasketHover, // Цвет контура кнопки при наведении
                                        },
                                      }}
                                      disabled={
                                        addBasketLoading === item.product.goodID ||
                                        isAddButtonDisabled(item.product.goodID)
                                      }
                                      color="primary"
                                      onClick={() => handleUpdateBasket(item.product.goodID, 'increase')}
                                    >
                                      {addBasketLoading === item.product.goodID ? (
                                        <CircularProgress size={'20px'} color="error" />
                                      ) : (
                                        <AddCircleOutlineIcon />
                                      )}
                                    </IconButton>
                                    <span>{item.quantity}</span>
                                    <IconButton
                                      sx={{ p: 0.5 }}
                                      disabled={addBasketLoading === item.product.goodID}
                                      color="primary"
                                      onClick={() =>
                                        item.quantity === 1
                                          ? handleUpdateBasket(item.product.goodID, 'remove')
                                          : handleUpdateBasket(item.product.goodID, 'decrease')
                                      }
                                    >
                                      {addBasketLoading === item.product.goodID ? (
                                        <CircularProgress size={'20px'} color="error" />
                                      ) : (
                                        <RemoveCircleOutlineIcon style={{ color: 'black' }} />
                                      )}
                                    </IconButton>
                                  </Box>
                                </TableCell>
                              </TableRow>
                              {item.product.size && (
                                <TableRow>
                                  <TableCell
                                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                    colSpan={2} // объединяем ячейки в одну строку
                                  >
                                    М²:
                                    <Typography fontSize={'14px'} fontWeight={'bold'}>
                                      {textMeters(item.quantity, calculateSquareAreaInSquareMeters(item.product.size))}
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              )}

                              {isAddButtonDisabled(item.product.goodID) && (
                                <TableRow>
                                  <TableCell sx={{ border: '1px solid black' }}>
                                    <Typography color={'red'} variant={'caption'} sx={{ alignSelf: 'flex-end' }}>
                                      Здесь вы можете оставить заявку на товар под заказ. Цену и количество уточняйте у
                                      менеджера, так как они могут отличаться. Сумма за товары под заказ учитывается
                                      отдельно. Оставьте заявку, вам перезвонят для оформления.
                                    </Typography>

                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                      }}
                                    >
                                      <Typography fontSize={'0.875rem'}> Количество под заказ:</Typography>
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <IconButton
                                          sx={{
                                            p: 0.5,
                                            color: btnPlusBasket, // Цвет контура кнопки
                                            '&:hover': {
                                              color: btnPlusBasketHover, // Цвет контура кнопки при наведении
                                            },
                                          }}
                                          disabled={addBasketLoading === item.product.goodID}
                                          onClick={() => handleUpdateBasket(item.product.goodID, 'increaseToOrder')}
                                          color="success"
                                        >
                                          {addBasketLoading === item.product.goodID ? (
                                            <CircularProgress size={'20px'} color="error" />
                                          ) : (
                                            <AddCircleOutlineIcon />
                                          )}
                                        </IconButton>
                                        <span>{item.quantityToOrder}</span>
                                        <IconButton
                                          sx={{ p: 0.5 }}
                                          onClick={() => handleUpdateBasket(item.product.goodID, 'decreaseToOrder')}
                                          color="primary"
                                          disabled={
                                            addBasketLoading === item.product.goodID || item.quantityToOrder === 0
                                          }
                                        >
                                          {addBasketLoading === item.product.goodID ? (
                                            <CircularProgress size={'20px'} color="error" />
                                          ) : (
                                            <RemoveCircleOutlineIcon
                                              style={item.quantityToOrder > 0 ? { color: 'black' } : undefined}
                                            />
                                          )}
                                        </IconButton>
                                      </Box>
                                    </Box>
                                    {item.product.size && item.quantityToOrder > 0 && (
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                        }}
                                        borderTop={'1px solid rgba(224, 224, 224, 1)'}
                                        pt={0.5}
                                        mt={0.5}
                                      >
                                        <Typography fontSize={'0.875rem'}> М²:</Typography>
                                        <Typography fontSize={'14px'} fontWeight={'bold'}>
                                          {textMeters(
                                            item.quantityToOrder,
                                            calculateSquareAreaInSquareMeters(item.product.size),
                                          )}
                                        </Typography>
                                      </Box>
                                    )}
                                  </TableCell>
                                </TableRow>
                              )}
                              <TableRow>
                                <TableCell colSpan={2}>
                                  Сумма: {(item.product.price * item.quantity).toFixed(2)} сом
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h5" gutterBottom>
                Общая сумма: {basket.totalPrice} сом
              </Typography>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <LoadingButton
                    loading={loadingBasket()}
                    disabled={basket?.items?.length === 0}
                    onClick={() => navigate('/order')}
                    variant="contained"
                    sx={btnBasketColorAdd}
                  >
                    Оформить заказ
                  </LoadingButton>
                </Grid>
                <Grid item>
                  <LoadingButton
                    loading={loadingBasket()}
                    disabled={basket?.items?.length === 0}
                    variant="outlined"
                    onClick={() => clearBasket('clear')}
                    sx={btnColorClearBasket}
                  >
                    Очистить корзину
                  </LoadingButton>
                </Grid>
              </Grid>
            </>
          ) : (
            <Typography variant="h5" gutterBottom textAlign={'center'}>
              Нет товаров
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default BasketPage;
