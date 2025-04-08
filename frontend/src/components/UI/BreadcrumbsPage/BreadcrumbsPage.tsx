import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Link } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectCategories } from '../../../features/MenuCategories/menuCategoriesSlice';
import { selectProductOne } from '../../../features/Products/productsSlice';

const BreadcrumbsPage = () => {
  const location = useLocation();
  const url = location.pathname;

  const parts = url.split('/');
  const pathName = parts[1];
  const categoryId = parts[2];

  const categories = useAppSelector(selectCategories);
  const productOne = useAppSelector(selectProductOne);
  const [breadcrumbs, setBreadcrumbs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const getCategoryByID = (id: string | undefined) => categories.find((item) => item.ID === id);

    // Получение 2-го уровня категории (от корня), начиная с leaf категории
    const getSecondLevelCategory = (startID: string | undefined) => {
      if (!startID) return undefined;
      const path: string[] = [];
      let current = getCategoryByID(startID);

      while (current) {
        path.unshift(current.ID);
        if (!current.ownerID) break;
        current = getCategoryByID(current.ownerID);
      }

      const levelIndex = path.length >= 3 ? 2 : path.length - 1;
      const secondLevel = getCategoryByID(path[levelIndex]);
      return secondLevel ? { id: secondLevel.ID, name: secondLevel.name } : undefined;
    };

    const baseBreadcrumbs = [
      <Link
        sx={{
          '&:hover': { color: '#f6c011' },
          textDecoration: 'none',
        }}
        key="home"
        href="/"
      >
        ГЛАВНАЯ
      </Link>,
    ];

    const generateBreadcrumbs = () => {
      const breadcrumbMap: { [key: string]: JSX.Element[] } = {
        products: categoryId
          ? [
              ...baseBreadcrumbs,
              <Link
                sx={{ '&:hover': { color: '#f6c011' }, textDecoration: 'none' }}
                fontWeight={'bold'}
                key="cat"
                href={`/products/${categoryId}`}
              >
                {getCategoryByID(categoryId)?.name || 'Категория'}
              </Link>,
            ]
          : [],
        product: productOne
          ? (() => {
              const secondLevel = getSecondLevelCategory(productOne.ownerID);
              return [
                ...baseBreadcrumbs,
                secondLevel && (
                  <Link
                    sx={{ '&:hover': { color: '#f6c011' }, textDecoration: 'none' }}
                    key="cat2"
                    href={`/products/${secondLevel.id}`}
                  >
                    {secondLevel.name}
                  </Link>
                ),
                <span key="product" style={{ fontWeight: 'bold' }}>
                  {productOne.name}
                </span>,
              ].filter(Boolean) as JSX.Element[];
            })()
          : [],
        productsNews: [
          ...baseBreadcrumbs,
          <span key="news" style={{ fontWeight: 'bold' }}>
            НОВИНКИ
          </span>,
        ],
        delivery: [
          ...baseBreadcrumbs,
          <span key="delivery" style={{ fontWeight: 'bold' }}>
            ДОСТАВКА
          </span>,
        ],
        installment: [
          ...baseBreadcrumbs,
          <span key="installment" style={{ fontWeight: 'bold' }}>
            РАССРОЧКА
          </span>,
        ],
        warranty: [
          ...baseBreadcrumbs,
          <span key="warranty" style={{ fontWeight: 'bold' }}>
            ГАРАНТИЯ
          </span>,
        ],
        designers: [
          ...baseBreadcrumbs,
          <span key="designers" style={{ fontWeight: 'bold' }}>
            ДИЗАЙНЕРАМ
          </span>,
        ],
        designersForm: [
          ...baseBreadcrumbs,
          <span key="designersForm" style={{ fontWeight: 'bold' }}>
            РЕДАКТИРОВАНИЕ РАЗДЕЛА ДЛЯ ДИЗАЙНЕРОВ
          </span>,
        ],
        contacts: [
          ...baseBreadcrumbs,
          <span key="contacts" style={{ fontWeight: 'bold' }}>
            КОНТАКТЫ
          </span>,
        ],
        about: [
          ...baseBreadcrumbs,
          <Link sx={{ '&:hover': { color: '#f6c011' }, textDecoration: 'none' }} key="aboutLink" href="/about">
            О НАС
          </Link>,
          <span key="brand" style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            {{
              rakceramics: 'Rak Ceramics',
              kludirak: 'Kludi Rak',
              rakporcelain: 'Rak Porcelain',
            }[categoryId] || ''}
          </span>,
        ],
        'my-cabinet': [
          ...baseBreadcrumbs,
          <span key="cabinet" style={{ fontWeight: 'bold' }}>
            ЛИЧНЫЙ КАБИНЕТ
          </span>,
        ],
        login: [
          ...baseBreadcrumbs,
          <span key="login" style={{ fontWeight: 'bold' }}>
            ВХОД
          </span>,
        ],
        register: [
          ...baseBreadcrumbs,
          <span key="register" style={{ fontWeight: 'bold' }}>
            РЕГИСТРАЦИЯ
          </span>,
        ],
        'search-results': [
          ...baseBreadcrumbs,
          <span key="search" style={{ fontWeight: 'bold' }}>
            РЕЗУЛЬТАТ ПОИСКА:
          </span>,
        ],
        basket: [
          ...baseBreadcrumbs,
          <span key="basket" style={{ fontWeight: 'bold' }}>
            КОРЗИНА
          </span>,
        ],
        order: [
          ...baseBreadcrumbs,
          <Link sx={{ '&:hover': { color: '#f6c011' }, textDecoration: 'none' }} key="basketBack" href="/basket">
            КОРЗИНА
          </Link>,
          <span key="checkout" style={{ fontWeight: 'bold' }}>
            ОФОРМЛЕНИЕ ЗАКАЗА
          </span>,
        ],
      };

      if (location.pathname === '/' || location.pathname === '/admin') {
        setBreadcrumbs([
          <Link sx={{ '&:hover': { color: '#f6c011' }, textDecoration: 'none' }} key="empty" href="/">
            <span style={{ display: 'block', height: '18px' }}></span>
          </Link>,
        ]);
      } else {
        setBreadcrumbs(breadcrumbMap[pathName] || []);
      }
    };

    generateBreadcrumbs();
  }, [pathName, categoryId, categories, productOne, location.pathname]);

  return (
    <Box sx={{ m: 1 }}>
      <Breadcrumbs sx={{ color: '#b0b0b0', fontSize: '12px' }} separator="›" aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => React.cloneElement(breadcrumb, { key: index, color: '#312e2e' }))}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsPage;
