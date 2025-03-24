import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCategories } from '../menuCategoriesSlice';
import { fetchCategories } from '../menuCategoriesThunks';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container, Typography } from '@mui/material';

interface Category {
  _id: string;
  name: string;
  ID: string;
  ownerID?: string;
  productsHave: boolean;
}

const MenuCategoriesNew: React.FC = () => {
  const [firstLevelCategories, setFirstLevelCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
          fontSize: '12px',
          textTransform: 'uppercase',
        }}
        onClick={() => handleCategoryClick(category)}
      >
        {category.name}
      </Typography>
    ));
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
                }}
              >
                <Box sx={{ padding: '10px' }}>{getThirdLevelCategories(category.ID)}</Box>

                {/* Картинка справа */}
                <Box sx={{ width: '70%' }}>
                  <img
                    src="https://ortgraph.ru/upload/medialibrary/e29/e290d6e38a4ab2b063d19fafdb48ef7a.jpg"
                    alt="Category"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
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
