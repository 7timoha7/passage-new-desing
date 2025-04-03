import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  selectChatIdAdminSuccess,
  selectUser,
  selectUserSuccess,
  setUserSuccessNull,
} from './features/users/usersSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Home from './containers/Home';
import MainPage from './containers/MainPage';
import Login from './features/users/Login';
import Register from './features/users/Register';
import './App.css';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import VerifyProtectedRoute from './components/UI/ProtectedRoute/VerifyProtectedRoute';
import VerifyPage from './components/UI/VerifyPage/VerifyPage';
import ConfirmPage from './components/UI/VerifyPage/ConfirmPage';
import GoogleProtectedRoute from './components/UI/ProtectedRoute/GoogleProtectedRoute';
import GooglePhoneNumber from './components/UI/VerifyPage/GooglePhoneNumber';
import Cabinet from './features/Сabinets/Cabinet';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';
import NoFoundPage from './components/UI/NoFoundPage/NoFoundPage';
import ProductsPage from './features/Products/components/ProductsPage';
import ProductFullPage from './features/Products/components/ProductFullPage';
import OrderForm from './features/Order/components/OrderForm';
import AboutPage from './components/UI/AboutPage/AboutPage';
import ContactsPage from './components/UI/СontactsPage/СontactsPage';
import {
  selectProductsFromApiSuccess,
  selectProductSuccess,
  setProductFromApiSuccessNull,
  setProductSuccessNull,
} from './features/Products/productsSlice';
import { selectBasketSuccess, setBasketSuccessNull } from './features/Basket/basketSlice';
import SearchPage from './components/UI/AppToolbar/NavigateTop/Components/SearchPage';
import { selectOrderSuccess, setOrderSuccessNull } from './features/Order/orderSlice';
import { selectBestsellerSuccess } from './features/Bestsellers/bestsellersSlice';
import Delivery from './components/UI/AppToolbar/NavigateTop/Components/ForClients/ForUsers/Delivery/Delivery';
import BasketPage from './features/Basket/BasketPage';
import Installment from './components/UI/AppToolbar/NavigateTop/Components/ForClients/ForUsers/Installment/Installment';
import Warranty from './components/UI/AppToolbar/NavigateTop/Components/ForClients/ForUsers/Warranty/Warranty';
import { selectBannersSuccess } from './features/Banners/bannersSlice';
import Designers from './components/UI/AppToolbar/NavigateTop/Components/ForClients/ForUsers/Designers/Designers';
import DesignersFormPage from './components/UI/AppToolbar/NavigateTop/Components/ForClients/ForUsers/Designers/Forms/DesignersFormPage';
import Rakceramics from './components/UI/AboutPage/Rakceramics';
import Kludirak from './components/UI/AboutPage/Kludirak';
import Rakporcelain from './components/UI/AboutPage/Rakporcelain';
import { selectDesignerSuccess } from './components/UI/AppToolbar/NavigateTop/Components/ForClients/ForUsers/Designers/designersSlice';
import GetADiscount from './features/GetADiscount/components/GetADiscount';
import Discounts from './features/GetADiscount/components/Discounts';

function App() {
  const user = useAppSelector(selectUser);
  const userSuccess = useAppSelector(selectUserSuccess);
  const productSuccess = useAppSelector(selectProductSuccess);
  const basketSuccess = useAppSelector(selectBasketSuccess);
  const productFromApiSuccess = useAppSelector(selectProductsFromApiSuccess);
  const orderSuccess = useAppSelector(selectOrderSuccess);
  const chatIdAdminSuccess = useAppSelector(selectChatIdAdminSuccess);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { i18n } = useTranslation();
  const basketBestsellerSuccess = useAppSelector(selectBestsellerSuccess);
  const bannersSuccess = useAppSelector(selectBannersSuccess);
  const designerSuccess = useAppSelector(selectDesignerSuccess);

  useEffect(() => {
    if (bannersSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(bannersSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        if (bannersSuccess.message.ru === 'Баннер успешно удален!') {
          enqueueSnackbar(bannersSuccess.message.ru, {
            variant: 'error',
            preventDuplicate: true,
          });
        } else {
          enqueueSnackbar(bannersSuccess.message.ru, {
            variant: 'success',
            preventDuplicate: true,
          });
        }
      }
    }
    dispatch(setProductSuccessNull());
  }, [bannersSuccess, dispatch, enqueueSnackbar, i18n.language]);

  useEffect(() => {
    if (designerSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(designerSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        if (
          designerSuccess.message.ru === 'Раздел для дизайнеров успешно удален!' ||
          designerSuccess.message.ru === 'Картинка успешно удалена!' ||
          designerSuccess.message.ru === 'Каталог удален!'
        ) {
          enqueueSnackbar(designerSuccess.message.ru, {
            variant: 'error',
            preventDuplicate: true,
          });
        } else {
          enqueueSnackbar(designerSuccess.message.ru, {
            variant: 'success',
            preventDuplicate: true,
          });
        }
      }
    }
    dispatch(setProductSuccessNull());
  }, [designerSuccess, dispatch, enqueueSnackbar, i18n.language]);

  useEffect(() => {
    if (basketBestsellerSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(basketBestsellerSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        if (basketBestsellerSuccess.message.ru === 'Товар успешно удален из хиты продаж!') {
          enqueueSnackbar(basketBestsellerSuccess.message.ru, {
            variant: 'error',
            preventDuplicate: true,
          });
        } else {
          enqueueSnackbar(basketBestsellerSuccess.message.ru, {
            variant: 'success',
            preventDuplicate: true,
          });
        }
      }
    }
    dispatch(setProductSuccessNull());
  }, [basketBestsellerSuccess, dispatch, enqueueSnackbar, i18n.language]);

  useEffect(() => {
    if (basketSuccess) {
      enqueueSnackbar(basketSuccess.message.ru, { variant: 'success', preventDuplicate: true });
    }
    dispatch(setBasketSuccessNull());
  }, [basketSuccess, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (chatIdAdminSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(chatIdAdminSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(chatIdAdminSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setProductSuccessNull());
  }, [chatIdAdminSuccess, dispatch, enqueueSnackbar, i18n.language]);

  useEffect(() => {
    if (userSuccess) {
      if (userSuccess.message.ru === 'Вы достигли лимита в 100 избранных продуктов') {
        enqueueSnackbar(userSuccess.message.ru, {
          variant: 'error',
          preventDuplicate: true,
        });
      }
      if (i18n.language === 'en') {
        enqueueSnackbar(userSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(userSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setUserSuccessNull());
  }, [userSuccess, i18n.language, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (productSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(productSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(productSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setProductSuccessNull());
  }, [productSuccess, i18n.language, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (productFromApiSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(productFromApiSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(productFromApiSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setProductFromApiSuccessNull());
  }, [productFromApiSuccess, i18n.language, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (orderSuccess) {
      const messageAlert = orderSuccess.message.ru.includes('Заказ уже взят администратором:');
      if (i18n.language === 'en') {
        enqueueSnackbar(orderSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else if (messageAlert) {
        enqueueSnackbar(orderSuccess.message.ru, {
          variant: 'error',
          preventDuplicate: true,
        });
        alert(orderSuccess.message.ru);
      } else {
        enqueueSnackbar(orderSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setOrderSuccessNull());
  }, [orderSuccess, i18n.language, dispatch, enqueueSnackbar]);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductFullPage />} />
        <Route path="/basket/" element={<BasketPage />} />
        <Route path="/order/" element={<OrderForm />} />
        <Route path="/about/" element={<AboutPage />} />
        <Route path="/contacts/" element={<ContactsPage />} />
        <Route path="/search-results/:text" element={<SearchPage />} />
        <Route path="/delivery/" element={<Delivery />} />
        <Route path="/installment/" element={<Installment />} />
        <Route path="/warranty/" element={<Warranty />} />
        <Route path="/designers/" element={<Designers />} />
        <Route path="about/rakceramics/" element={<Rakceramics />} />
        <Route path="about/kludirak/" element={<Kludirak />} />
        <Route path="about/rakporcelain/" element={<Rakporcelain />} />
        <Route path="get-a-discount" element={<GetADiscount />} />
        <Route path="list-of-discounts" element={<Discounts />} />
        <Route
          path="/my-cabinet"
          element={
            user?.phoneNumber === '000' ? (
              <GoogleProtectedRoute google={user && user.phoneNumber !== '000'}>
                <Cabinet />
              </GoogleProtectedRoute>
            ) : (
              <VerifyProtectedRoute isVerify={user && user.isVerified}>
                <Cabinet />
              </VerifyProtectedRoute>
            )
          }
        />
        <Route
          path="/google"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <GooglePhoneNumber />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verifyPage"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <VerifyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify/:token"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <ConfirmPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/designersForm/"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <DesignersFormPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
