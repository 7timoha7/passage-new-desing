import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCategories, selectCategoriesImage } from '../menuCategoriesSlice';
import { categoriesImageFetch, fetchCategories } from '../menuCategoriesThunks';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container, Typography } from '@mui/material';
import { apiURL } from '../../../constants';
import { useNavigate } from 'react-router-dom';

interface Category {
  _id: string;
  name: string;
  ID: string;
  ownerID?: string;
  productsHave: boolean;
}

interface Props {
  close: () => void;
}

const MenuCategoriesNew: React.FC<Props> = ({ close }) => {
  const [firstLevelCategories, setFirstLevelCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [hoveredCategoryID, setHoveredCategoryID] = useState<string | null>(null);

  const categories = useAppSelector(selectCategories);
  const categoriesImage = useAppSelector(selectCategoriesImage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (firstLevelCategories.length > 0) {
      const thirdLevelCategories = categories.filter((category) =>
        firstLevelCategories.some((firstLevel) => firstLevel.ID === category.ownerID),
      );

      const thirdLevelCategoryIDs = thirdLevelCategories.map((category) => category.ID);

      if (thirdLevelCategoryIDs.length > 0) {
        dispatch(categoriesImageFetch(thirdLevelCategoryIDs));
      }
    }
  }, [firstLevelCategories, categories, dispatch]);

  useEffect(() => {
    const rootCategory = categories.find((category) => !category.ownerID);
    if (rootCategory) {
      const children = categories.filter((category) => category.ownerID === rootCategory.ID);
      setFirstLevelCategories(children);
    }
  }, [categories]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory((prev) => (prev?.ID === category.ID ? null : category));
  };

  const handleClickOutside = (event: MouseEvent) => {
    const menu = document.getElementById('menu-container');
    if (menu && !menu.contains(event.target as Node)) {
      setActiveCategory(null);
    }
  };

  useEffect(() => {
    if (activeCategory) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeCategory]);

  // Получение списка категорий 3-го уровня
  const getThirdLevelCategories = (parentID: string) => {
    const thirdLevelCategories = categories.filter((category) => category.ownerID === parentID);
    if (thirdLevelCategories.length === 0) return null;

    return thirdLevelCategories.map((category) => (
      <Typography
        key={category._id}
        sx={{
          cursor: 'pointer',
          mb: 1,
          color: activeCategory?.ID === category.ID ? '#ddbe86' : 'rgb(0,0,0)',
          '&:hover': { color: '#ddbe86' },
          fontSize: '14px',
          textTransform: 'uppercase',
        }}
        onClick={() => {
          navigate('products/' + category.ID);
          handleCategoryClick(category);
          setActiveCategory(null); // Закрываем меню при выборе категории 3-го уровня
          close();
        }}
        onMouseEnter={() => setHoveredCategoryID(category.ID)}
        onMouseLeave={() => setHoveredCategoryID(null)}
      >
        {category.name}
      </Typography>
    ));
  };

  // Функция получения картинки категории
  const getCategoryImg = (id: string | null) => {
    if (!id) return null;
    const categoryImage = categoriesImage.find((item) => item.ID === id);
    return categoryImage?.images?.length ? categoryImage.images[0] : null;
  };

  return (
    <Container maxWidth="xl">
      {/* Затемнённый фон (исчезает при клике) */}
      {activeCategory && (
        <Box
          onClick={() => setActiveCategory(null)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1100,
          }}
        />
      )}

      <Box id="menu-container" sx={{ display: 'flex', gap: '20px', padding: '10px', zIndex: 1101, flexWrap: 'wrap' }}>
        {firstLevelCategories.map((category) => (
          <Box key={category._id}>
            <Box
              onClick={(e) => {
                e.stopPropagation();
                handleCategoryClick(category);
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: activeCategory?.ID === category.ID ? '#ddbe86' : 'rgb(0,0,0)',
                cursor: 'pointer',
                '&:hover': { color: '#ddbe86' },
              }}
            >
              <MenuIcon fontSize="small" sx={{ mr: '8px' }} />
              <span style={{ textTransform: 'uppercase' }}>{category.name}</span>
            </Box>

            {activeCategory?.ID === category.ID && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#fff',
                  boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                  minWidth: '1100px',
                  zIndex: 1102,
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: '550px', // Фиксированная высота для предотвращения изменения размера
                }}
              >
                <Box sx={{ padding: '20px' }}>{getThirdLevelCategories(category.ID)}</Box>

                {/* Картинка справа при наведении */}
                <Box
                  sx={{
                    width: '70%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f9f9f9', // Фон, если картинка маленькая
                  }}
                >
                  {hoveredCategoryID && getCategoryImg(hoveredCategoryID) ? (
                    <img
                      src={`${apiURL}/${getCategoryImg(hoveredCategoryID)}`}
                      alt="Category"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <img
                      src="https://ortgraph.ru/upload/medialibrary/e29/e290d6e38a4ab2b063d19fafdb48ef7a.jpg"
                      alt="Category"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  )}
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default MenuCategoriesNew;
