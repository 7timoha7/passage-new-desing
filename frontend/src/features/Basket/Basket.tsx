import React, { useEffect } from 'react';
import { Badge, IconButton, useMediaQuery } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createBasket, fetchBasket } from './basketThunks';
import { selectBasket } from './basketSlice';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ToolBarTopTextSearchBasket } from '../../styles';
import Button from '@mui/material/Button';

const Basket = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const isMobileMenu = useMediaQuery('(min-width: 1200px)');

  useEffect(() => {
    if (user) {
      dispatch(createBasket({}));
    }
    let storedBasketId = localStorage.getItem('sessionKey');

    if (!storedBasketId) {
      storedBasketId = uuidv4();
      localStorage.setItem('sessionKey', storedBasketId);
      dispatch(createBasket({ sessionKey: storedBasketId }));
    } else if (storedBasketId) {
      dispatch(fetchBasket(storedBasketId));
    }
  }, [user, dispatch]);

  return (
    <>
      {isMobileMenu ? (
        <Button
          aria-label="Корзина"
          color="inherit"
          onClick={() => navigate('/basket')}
          sx={ToolBarTopTextSearchBasket}
        >
          <Badge badgeContent={basket?.items?.length || 0} color="error">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ShoppingCartIcon fontSize="medium" />
              <p style={{ fontSize: '9px', margin: 0, padding: 0 }}>Корзина</p>
            </div>
          </Badge>
        </Button>
      ) : (
        <IconButton color="inherit" onClick={() => navigate('/basket')} sx={ToolBarTopTextSearchBasket}>
          <Badge badgeContent={basket?.items?.length || 0} color="error">
            <ShoppingCartIcon fontSize="medium" />
          </Badge>
        </IconButton>
      )}
    </>
  );
};

export default Basket;
