import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCategories } from '../menuCategoriesSlice';
import { fetchCategories } from '../menuCategoriesThunks';
import './MenuCategoriesTop.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

// Определим тип для категории
interface Category {
  _id: string;
  name: string;
  ID: string;
  ownerID?: string;
  productsHave: boolean;
  subcategories?: Category[]; // Подкатегории
}

// Рекурсивная функция для построения полного дерева категорий
const buildCategoryTree = (categories: Category[], parentId: string): Category[] => {
  const categoryTree: Category[] = [];

  const sortedCategories = categories
    .filter((category) => category.ownerID === parentId)
    .slice()
    .sort((a, b) => {
      // Сначала сортируем категории по наличию подкатегорий
      const aHasSubcategories = categories.some((cat) => cat.ownerID === a.ID);
      const bHasSubcategories = categories.some((cat) => cat.ownerID === b.ID);

      if (aHasSubcategories && !bHasSubcategories) return -1;
      if (!aHasSubcategories && bHasSubcategories) return 1;

      // Затем сортируем по строке "RAK" в начале названия
      const searchString = 'RAK';
      const aStartsWithSearch = a.name.toLowerCase().startsWith(searchString.toLowerCase());
      const bStartsWithSearch = b.name.toLowerCase().startsWith(searchString.toLowerCase());

      if (aStartsWithSearch && !bStartsWithSearch) return -1;
      if (!aStartsWithSearch && bStartsWithSearch) return 1;

      // Если обе строки начинаются с поисковой строки или не содержат ее,
      // тогда сравниваем их с помощью localeCompare для алфавитной сортировки
      return a.name.localeCompare(b.name);
    });

  sortedCategories.forEach((category) => {
    const subcategories = buildCategoryTree(categories, category.ID);
    const categoryWithSubcategories: Category = { ...category, subcategories };
    categoryTree.push(categoryWithSubcategories);
  });

  return categoryTree;
};

const MenuCategoriesTop: React.FC = () => {
  const [categoriesTree, setCategoriesTree] = useState<Category[]>([]);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Запрос категорий при монтировании компонента
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Формирование полного дерева категорий при получении новых данных
    const fullTree = buildCategoryTree(categories, '');
    setCategoriesTree(fullTree);
  }, [categories]);

  // Рекурсивная функция для вывода всех вложенностей категорий
  const renderCategoryTree = (categories: Category[]): JSX.Element[] => {
    return categories.map((category) => (
      <li key={category._id}>
        {category.subcategories && category.subcategories.length === 0 ? (
          <a onClick={() => navigate('products/' + category.ID)} className="submenu-link2">
            <span className={'category-name'}>{category.name}</span>
            {/* Добавляем иконку */}
            {category.subcategories && category.subcategories.length > 0 && <ArrowRightIcon className="icon" />}
          </a>
        ) : (
          <a onClick={() => navigate('products/' + category.ID)} className="submenu-link">
            <span className={'category-name'}>{category.name}</span>
            {/* Добавляем иконку */}
            {category.subcategories && category.subcategories.length > 0 && <ArrowRightIcon className="icon" />}
          </a>
        )}

        {category.subcategories && category.subcategories.length > 0 && (
          <ul className="submenu">{renderCategoryTree(category.subcategories)}</ul>
        )}
      </li>
    ));
  };

  return (
    <nav style={{ textTransform: 'uppercase' }}>
      <ul className="topmenu">
        {categoriesTree.map((category) => (
          <React.Fragment key={category._id}>
            <li>
              <a href="#">
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '25px' }}>
                  <MenuIcon fontSize={'medium'} sx={{ mr: 1 }} />
                  <span>{'Каталог'}</span>
                </div>
              </a>
              {category.subcategories && category.subcategories.length > 0 && (
                <ul className="submenu">{renderCategoryTree(category.subcategories)}</ul>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default MenuCategoriesTop;
