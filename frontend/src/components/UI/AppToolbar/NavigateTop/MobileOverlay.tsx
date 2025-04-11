import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCategories } from '../../../../features/MenuCategories/menuCategoriesSlice';
import { fetchCategories } from '../../../../features/MenuCategories/menuCategoriesThunks';
import { motion, AnimatePresence } from 'framer-motion';
import UserMenu from '../UserMenu';
import AnonymousMenu from '../AnonymousMenu';
import { selectUser } from '../../../../features/users/usersSlice';

interface Props {
  onClose: () => void;
}

type MenuLevel = 'root' | 'catalog' | 'clients';
type Category = { name: string; ID: string; _id: string; ownerID?: string };

const MobileOverlay: React.FC<Props> = ({ onClose }) => {
  const [menuHistory, setMenuHistory] = useState<Array<MenuLevel | Category>>(['root']);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const currentLevel = menuHistory[menuHistory.length - 1];

  const rootCategory = categories.find((cat) => !cat.ownerID);
  const firstLevel = categories.filter((cat) => cat.ownerID === rootCategory?.ID);
  const secondLevel = (parentID: string) => categories.filter((cat) => cat.ownerID === parentID);

  const handlePush = (next: MenuLevel | Category) => {
    setDirection('forward');
    setMenuHistory((prev) => [...prev, next]);
  };

  const handleBack = () => {
    setDirection('backward');
    setMenuHistory((prev) => prev.slice(0, -1));
  };

  const handleNavigate = (id: string) => {
    navigate('/products/' + id);
    onClose();
  };

  const renderRootMenu = () => (
    <Box>
      <MobileMenuItem title="Каталог" onClick={() => handlePush('catalog')} />
      <MobileMenuItem title="Контакты" link="/contacts" onClick={onClose} />
      <MobileMenuItem title="О нас" link="/about" onClick={onClose} />
      <MobileMenuItem title="Клиентам" onClick={() => handlePush('clients')} />
    </Box>
  );

  const renderCatalogMenu = (parentCategory?: Category) => {
    const items = parentCategory ? secondLevel(parentCategory.ID) : firstLevel;

    return (
      <Box>
        <Box display="flex" alignItems="center" gap={1} p={2}>
          <IconButton onClick={handleBack} size="small">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6" fontWeight={600}>
            {parentCategory ? parentCategory.name : 'Каталог'}
          </Typography>
        </Box>
        <Divider />
        {items.map((cat) => (
          <MobileMenuItem
            key={cat._id}
            title={cat.name}
            onClick={() => {
              if (!parentCategory) {
                handlePush(cat); // перешли на 2 уровень
              } else {
                handleNavigate(cat.ID); // максимум 2 уровня — открываем
              }
            }}
          />
        ))}
      </Box>
    );
  };

  const renderClientsMenu = () => (
    <Box>
      <Box display="flex" alignItems="center" gap={1} p={2}>
        <IconButton onClick={handleBack} size="small">
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" fontWeight={600}>
          Клиентам
        </Typography>
      </Box>
      <Divider />
      {[
        { title: 'ДОСТАВКА', to: '/delivery' },
        { title: 'РАССРОЧКА', to: '/installment' },
        { title: 'ГАРАНТИЯ', to: '/warranty' },
        { title: 'ДИЗАЙНЕРАМ', to: '/designers' },
      ].map((link) => (
        <Link key={link.to} to={link.to} onClick={onClose} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box display="flex" alignItems="center" px={2} py={1.5}>
            <MenuIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
              {link.title}
            </Typography>
          </Box>
          <Divider />
        </Link>
      ))}
    </Box>
  );

  const renderCurrentMenu = () => {
    if (typeof currentLevel === 'string') {
      if (currentLevel === 'root') return renderRootMenu();
      if (currentLevel === 'catalog') return renderCatalogMenu();
      if (currentLevel === 'clients') return renderClientsMenu();
    } else {
      return renderCatalogMenu(currentLevel); // 2 уровень
    }
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 2000,
        backgroundColor: '#fff',
        overflowY: 'auto',
        textTransform: 'uppercase',
      }}
      initial={{ x: direction === 'forward' ? '100%' : '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: direction === 'forward' ? '-100%' : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <img src="/logo_brown_black.png" alt="logo" style={{ height: '50px' }} />
        <IconButton onClick={onClose}>
          <CloseIcon fontSize={'large'} />
        </IconButton>
      </Box>
      <Divider />
      <AnimatePresence mode="wait">
        <motion.div
          key={menuHistory.map((m) => (typeof m === 'string' ? m : m.ID)).join('-')}
          initial={{ x: direction === 'forward' ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: direction === 'forward' ? '-100%' : '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {renderCurrentMenu()}
        </motion.div>
      </AnimatePresence>
      <Box display={user !== null || location.pathname === '/admin' ? 'flex' : 'none'} alignItems="center">
        {user && <UserMenu user={user} />}
        {location.pathname === '/admin' && !user && <AnonymousMenu />}
      </Box>
    </motion.div>
  );
};

interface MobileMenuItemProps {
  title: string;
  link?: string;
  onClick?: () => void;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ title, link, onClick }) => {
  const content = (
    <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1.5}>
      <Typography variant="subtitle1">{title}</Typography>
      <ArrowForwardIosIcon fontSize="small" />
    </Box>
  );

  return (
    <>
      {link ? (
        <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }} onClick={onClick}>
          {content}
        </Link>
      ) : (
        <Box onClick={onClick} sx={{ cursor: 'pointer' }}>
          {content}
        </Box>
      )}
      <Divider />
    </>
  );
};

export default MobileOverlay;
