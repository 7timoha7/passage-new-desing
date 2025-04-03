import img1 from '../../frontend/src/assets/images/newFon/13.jpeg';

export const ToolBarTopText = {
  color: '#1D1D1D',
  fontSize: '15px',
  textDecoration: 'none',
  marginRight: '50px',
  ':hover': { color: '#ddbe86' },
};

export const ToolBarTopTextSearchBasket = {
  color: '#1D1D1D',
  fontSize: '9px',
  textDecoration: 'none',
  ':hover': { color: '#ddbe86' },
};

//цвет боковых граней с верху и с низу от тулбара
export const toolbarTobAndBottomColor = '#FFFFFF';

export const ToolBarStyles = {
  backgroundImage: `url(${img1})`,
  backgroundSize: 'repeat',
  top: 0,
  py: 2.5,
};
export const ToolBarMobileStyles = {
  backgroundImage: `url(${img1})`,
  backgroundSize: 'repeat',
  top: 0,
  py: 1.5,
};

export const FooterStyle = {
  // background: 'linear-gradient(45deg, hsla(210, 100%, 88%, 1) 0%, hsla(210, 79%, 46%, 1) 100%)',
  // backgroundImage: `url(${img1})`,
  // backgroundSize: 'repeat',
  background: '#1D1D1D',
  boxShadow: '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)',
};

export const styleModalCover = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid black',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const styleModalCoverNew = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid black',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: '90%',
  maxHeight: '90vh', // Вы можете установить максимальную высоту в виде процента от высоты экрана
  overflowY: 'auto', // Это свойство добавит вертикальную прокрутку при необходимости
};

export const someStyle = {
  boxShadow: '0px 0px 5px 0px rgb(64,64,64)',
};

//цвет кнопок в большой карточке продукта
export const btnFullCardColor = {
  color: '#e39912', // Цвет контура кнопки
  borderColor: '#e39912', // Цвет контура кнопки
  '&:hover': {
    color: '#756433', // Цвет контура кнопки при наведении
    borderColor: '#756433', // Цвет контура кнопки при наведении
  },
};

//цвет цены - большой карточке товара
export const priceColorFullCard = '#e39912';
// цвет цены большая карта за плитку и м2
export const priceNameColorFullCard = '#75684f';

//цвет кнопок в большой корзине
export const btnBasketColorAdd = {
  marginLeft: 2,
  backgroundColor: '#e39912',
  '&:hover': {
    backgroundColor: '#756433', // Цвет контура кнопки при наведении
  },
};
export const btnColorClearBasket = {
  marginLeft: 2,
  color: '#e39912', // Цвет контура кнопки
  borderColor: '#e39912', // Цвет контура кнопки

  '&:hover': {
    borderColor: '#756433', // Цвет контура кнопки при наведении
    color: '#756433', // Цвет контура кнопки
  },
};

///////////////////цвет плюса в корзине большой

export const btnPlusBasket = '#e39912';
export const btnPlusBasketHover = '#756433';

////////////////////цвет кнопок вход регистрация
export const btnColorLigInRegister = {
  backgroundColor: '#ddbe86', // Цвет кнопки
  '&:hover': {
    backgroundColor: '#ab944d', // Цвет кнопки при наведении
  },
  mt: 3,
  mb: 2,
};
export const btnColorLigInRegisterBottom = {
  color: '#ddbe86',
  '&:hover': {
    color: '#ab944d', // Цвет кнопки при наведении
  },
  textDecoration: 'none',
};

export const backgroundColorLoginRegister = 'rgba(0,0,0,0.57)';

export const avatarColor = '#ddbe86';

//////////// кнопки в userItem.tsx
export const btnUserItemColor = {
  mt: 2,
  color: '#e39912', // Цвет контура кнопки
  borderColor: '#e39912', // Цвет контура кнопки

  '&:hover': {
    borderColor: '#756433', // Цвет контура кнопки при наведении
    color: '#756433', // Цвет контура кнопки
  },
};

export const btnUserItemColorCancel = {
  mt: 2,
  color: '#e39912', // Цвет контура кнопки
  borderColor: '#e39912', // Цвет контура кнопки

  '&:hover': {
    borderColor: '#756433', // Цвет контура кнопки при наведении
    color: '#756433', // Цвет контура кнопки
  },
};

export const btnUserItemColorYes = {
  mt: 2,
  color: '#e39912', // Цвет контура кнопки
  borderColor: '#e39912', // Цвет контура кнопки

  '&:hover': {
    borderColor: '#756433', // Цвет контура кнопки при наведении
    color: '#756433', // Цвет контура кнопки
  },
};

////////////цвета в Кабинетах
export const colorMenuInf = '#e8b86d';
export const btnColorRestorePassword = {
  borderColor: '#e3a230',
  color: '#e3a230',
  '&:hover': {
    borderColor: '#ab944d',
    color: '#ab944d',
  },
};

export const btnColorRestorePasswordCancelAndChange = {
  color: '#e3a230',
  '&:hover': {
    color: '#ab944d',
  },
};

export const btnColorChatIDSend = {
  color: '#ffffff', // Цвет контура кнопки
  background: '#e39912', // Цвет контура кнопки

  '&:hover': {
    background: '#756433', // Цвет контура кнопки при наведении
    color: '#ffffff', // Цвет контура кнопки
  },
};

export const btnColorChatIDInstructions = {
  color: '#e39912', // Цвет контура кнопки
  borderColor: '#e39912', // Цвет контура кнопки

  '&:hover': {
    borderColor: '#756433', // Цвет контура кнопки при наведении
    color: '#756433', // Цвет контура кнопки
  },
};

export const btnColorUpdateBase = {
  mt: 3,
  color: '#ffffff', // Цвет контура кнопки
  background: '#e39912', // Цвет контура кнопки
  '&:hover': {
    color: '#ffffff', // Цвет контура кнопки при наведении
    background: '#756433', // Цвет контура кнопки при наведении
  },
};

export const productsForBgPage = 'rgba(253,229,171,0.55)';

export const productsForBgPageCheckBox = 'rgba(253,203,92,0.62)';

export const productsForBgPageCheckBoxInf = 'rgba(255,128,0,0.84)';

export const btnColorProductsForChange = {
  backgroundColor: '#fac058', // Цвет кнопки
  '&:hover': {
    backgroundColor: '#ab944d', // Цвет кнопки при наведении
  },
};
export const btnColorProductsForModalCancel = {
  borderColor: '#fac058', // Цвет кнопки
  color: '#fac058',
  '&:hover': {
    borderColor: '#ab944d', // Цвет кнопки при наведении
    color: '#ab944d',
  },
};

/////Цвета в оформлении заказа
export const colorFormBg = 'rgba(0,0,0,0.57)';
export const btnColorOrderFormCreateOrder = {
  backgroundColor: '#ddbe86', // Цвет кнопки
  '&:hover': {
    backgroundColor: '#ab944d', // Цвет кнопки при наведении
  },
};

export const btnColorOrderFormCancel = {
  borderColor: '#ddbe86', // Цвет кнопки
  color: '#ddbe86',
  '&:hover': {
    borderColor: '#ab944d', // Цвет кнопки при наведении
    color: '#ab944d', // Цвет кнопки при наведении
  },
};
