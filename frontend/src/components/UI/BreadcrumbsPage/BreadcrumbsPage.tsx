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
    const getCategoryPath = (categoryID: string) => {
      const category = categories.find((item) => item.ID === categoryID);
      return category ? category.name : '';
    };

    const generateBreadcrumbs = () => {
      const baseBreadcrumbs = [
        <Link
          sx={{
            '&:hover': { color: '#f6c011' },
            textDecoration: 'none',
          }}
          key="1"
          href="/"
        >
          ГЛАВНАЯ
        </Link>,
      ];

      const breadcrumbMap: { [key: string]: JSX.Element[] } = {
        products: categoryId
          ? [
              ...baseBreadcrumbs,
              <Link
                sx={{
                  '&:hover': { color: '#f6c011' },
                  textDecoration: 'none',
                }}
                fontWeight={'bold'}
                key="2"
                href={`/products/${categoryId}`}
              >
                {getCategoryPath(categoryId) || 'Категория'}
              </Link>,
            ]
          : [],
        product: productOne
          ? [
              ...baseBreadcrumbs,
              <Link
                sx={{
                  '&:hover': { color: '#f6c011' },
                  textDecoration: 'none',
                }}
                key="2"
                href={`/products/${productOne.ownerID}`}
              >
                {getCategoryPath(productOne.ownerID) || 'Категория'}
              </Link>,
              <span key="3" style={{ fontWeight: 'bold' }}>
                {productOne.name}
              </span>,
            ]
          : [],
        productsNews: [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            НОВИНКИ
          </span>,
        ],
        delivery: [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            ДОСТАВКА
          </span>,
        ],
        installment: [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            РАСРОЧКА
          </span>,
        ],
        warranty: [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            ГАРАНТИЯ
          </span>,
        ],
        designers: [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            ДИЗАЙНЕРАМ
          </span>,
        ],
        designersForm: [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            РЕДАКТИРОВАНИЕ РАЗДЕЛА ДЛЯ ДИЗАЙНЕРОВ
          </span>,
        ],
        contacts: [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            КОНТАКТЫ
          </span>,
        ],
        about: [
          ...baseBreadcrumbs,
          <Link
            sx={{
              '&:hover': { color: '#f6c011' },
              textDecoration: 'none',
            }}
            key="2"
            href="/about"
          >
            О НАС
          </Link>,
          <span key="3" style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            {{
              rakceramics: 'Rak Ceramics',
              kludirak: 'Kludi Rak',
              rakporcelain: 'Rak Porcelain',
            }[categoryId] || ''}
          </span>,
        ],
        'my-cabinet': [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            ЛИЧНЫЙ КАБИНЕТ
          </span>,
        ],
        login: [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            ВХОД
          </span>,
        ],
        register: [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            РЕГИСТРАЦИЯ
          </span>,
        ],
        'search-results': [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            РЕЗУЛЬТАТ ПОИСКА:
          </span>,
        ],
        basket: [
          ...baseBreadcrumbs,
          <span key="2" style={{ fontWeight: 'bold' }}>
            КОРЗИНА
          </span>,
        ],
        order: [
          ...baseBreadcrumbs,
          <Link
            sx={{
              '&:hover': { color: '#f6c011' },
              textDecoration: 'none',
            }}
            key="2"
            href="/basket"
          >
            КОРЗИНА
          </Link>,
          <span key="3" style={{ fontWeight: 'bold' }}>
            ОФОРМЛЕНИЕ ЗАКАЗА
          </span>,
        ],
      };

      // Special condition for root and admin paths
      if (location.pathname === '/' || location.pathname === '/admin') {
        setBreadcrumbs([
          <Link
            sx={{
              '&:hover': { color: '#f6c011' },
              textDecoration: 'none',
            }}
            key="1"
            href="/"
          >
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
        {breadcrumbs.map((breadcrumb, index) => React.cloneElement(breadcrumb, { key: index, color: '#ffffff' }))}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsPage;
