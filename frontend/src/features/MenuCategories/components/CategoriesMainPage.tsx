import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { apiURL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { selectCategories, selectCategoriesImageMain, selectFetchAllCategoriesLoading } from '../menuCategoriesSlice';
import { categoriesImageFetchMain, fetchCategories } from '../menuCategoriesThunks';
import Spinner from '../../../components/UI/Spinner/Spinner';

// Интерфейс для категории
interface Category {
  _id: string;
  name: string;
  ID: string;
  ownerID?: string; // ownerID есть у категорий второго уровня
  productsHave: boolean;
}

const CategoriesMainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Получаем данные из Redux
  const categories = useAppSelector(selectCategories) as Category[];
  const categoriesImageMain = useAppSelector(selectCategoriesImageMain);
  const loading = useAppSelector(selectFetchAllCategoriesLoading);

  // Локальное состояние для категорий второго уровня
  const [secondLevelCategories, setSecondLevelCategories] = useState<Category[]>([]);

  // Функция для определения категорий второго уровня
  const getSecondLevelCategories = (allCategories: Category[]) => {
    const firstLevelCategoryIDs = allCategories.filter((cat) => !cat.ownerID).map((cat) => cat.ID);
    return allCategories.filter((category) => category.ownerID && firstLevelCategoryIDs.includes(category.ownerID));
  };

  // Загружаем категории при монтировании
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Фильтруем категории второго уровня и запрашиваем их изображения
  useEffect(() => {
    const secondLevel = getSecondLevelCategories(categories);
    setSecondLevelCategories(secondLevel);

    if (secondLevel.length > 0) {
      const categoryIDs = secondLevel.map((cat) => cat.ID);
      dispatch(categoriesImageFetchMain(categoryIDs));
    }
  }, [categories, dispatch]);

  // Функция получения изображения категории
  const getCategoryImg = (id: string) => {
    const categoryImage = categoriesImageMain.find((item) => item.ID === id);
    return categoryImage?.images?.length ? categoryImage.images[0] : null;
  };

  return (
    <Box sx={{ margin: 'auto', padding: '20px' }}>
      {loading ? (
        <Spinner />
      ) : (
        <Grid container spacing={3}>
          {secondLevelCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
              <Box
                onClick={() => navigate('/products/' + category.ID)}
                sx={{
                  position: 'relative',
                  height: '250px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                {/* Название категории */}
                <Typography
                  variant="h6"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    color: '#fff',
                    padding: '5px 10px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '14px',
                  }}
                >
                  {category.name}
                </Typography>

                {/* Изображение категории */}
                <Box
                  component="img"
                  src={
                    getCategoryImg(category.ID)
                      ? `${apiURL}/${getCategoryImg(category.ID)}`
                      : 'https://via.placeholder.com/300'
                  }
                  alt={category.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CategoriesMainPage;
