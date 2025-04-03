import express from 'express';
import Product from '../models/Product';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { promises as fs } from 'fs';
import Category from '../models/Category';

const productRouter = express.Router();

productRouter.post('/', async (req, res, next) => {
  try {
    const product = new Product({
      categoryId: req.body.categoryId,
      name: req.body.name,
      desc: req.body.desc,
      unit: req.body.unit,
      vendorCode: parseInt(req.body.vendorCode),
      group: req.body.group,
      cod: req.body.cod,
      dimensions: req.body.dimensions,
      weight: req.body.weight,
      image: req.files ? (req.files as Express.Multer.File[]).map((file) => file.filename) : null,
      price: parseFloat(req.body.price),
    });

    await product.save();
    return res.send({ message: 'Product created successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

const getAllFinalCategories = async (categoryId: string): Promise<string[]> => {
  const finalCategories: string[] = [];

  const traverseCategories = async (id: string) => {
    const category = await Category.findOne({ ID: id });
    if (category) {
      if (category.productsHave) {
        finalCategories.push(category.ID);
      }
      // Продолжаем обходить подкатегории даже если текущая категория имеет продукты
      const subcategories = await Category.find({ ownerID: category.ID });
      await Promise.all(subcategories.map((subcategory) => traverseCategories(subcategory.ID)));
    }
  };

  await traverseCategories(categoryId);
  return finalCategories;
};

productRouter.get('/', async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = 20;

    let query = {};

    if (req.query.category) {
      const categoryId = req.query.category as string;
      const finalCategories = await getAllFinalCategories(categoryId);

      query = { ownerID: { $in: finalCategories } };
    }

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await Product.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.send({
      products,
      pageInfo: {
        currentPage: page,
        totalPages,
        pageSize,
        totalItems: totalProducts,
      },
    });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

// productRouter.get('/news', async (req, res) => {
//   try {
//     const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
//     const pageSize = 20;
//     const totalProducts = await Product.countDocuments();
//     const totalPages = Math.ceil(totalProducts / pageSize);
//
//     let products;
//
//     if (page <= 2) {
//       // Получаем первые 40 продуктов
//       const first40Products = await Product.find().limit(40);
//       // Определяем диапазон для текущей страницы
//       const startIndex = (page - 1) * pageSize;
//       const endIndex = startIndex + pageSize;
//       // Рандомно перемешиваем первые 40 продуктов
//       const shuffledProducts = first40Products.sort(() => Math.random() - 0.5);
//       // Берем нужный диапазон продуктов для текущей страницы
//       products = shuffledProducts.slice(startIndex, endIndex);
//     } else {
//       // Для всех остальных страниц
//       products = await Product.find()
//         .sort({ article: -1 }) // Сортируем по убыванию значения поля article
//         .skip((page - 1) * pageSize)
//         .limit(pageSize);
//     }
//
//     return res.send({
//       products,
//       pageInfo: {
//         currentPage: page,
//         totalPages,
//         pageSize,
//         totalItems: totalProducts,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.sendStatus(500);
//   }
// });

productRouter.get('/news', async (req, res) => {
  try {
    // Получаем последние 50 товаров, сортируя по убыванию article
    const last50Products = await Product.find()
      .sort({ article: -1 }) // Сортируем по убыванию article
      .limit(50); // Берем 50 последних товаров

    // Перемешиваем их случайным образом
    const shuffledProducts = last50Products.sort(() => Math.random() - 0.5);

    // Берем первые 10 после перемешивания
    const selectedProducts = shuffledProducts.slice(0, 10);

    return res.send({ products: selectedProducts });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

productRouter.get('/productsSale', async (req, res) => {
  try {
    // 1. Находим категорию "РАСПРОДАЖА"
    const saleCategory = await Category.findOne({ name: 'РАСПРОДАЖА' });

    if (!saleCategory) {
      return res.status(404).json({ message: "Категория 'РАСПРОДАЖА' не найдена" });
    }

    // 2. Функция для поиска всех вложенных категорий (по ownerID)
    const getAllSubcategories = async (parentID: string): Promise<string[]> => {
      const subcategories = await Category.find({ ownerID: parentID });
      let allCategories = subcategories.map((cat) => cat.ID);

      for (const subcat of subcategories) {
        const nestedCategories = await getAllSubcategories(subcat.ID);
        allCategories = allCategories.concat(nestedCategories);
      }

      return allCategories;
    };

    // 3. Получаем все вложенные категории
    const categoryIDs = await getAllSubcategories(saleCategory.ID);
    categoryIDs.push(saleCategory.ID); // Добавляем саму "РАСПРОДАЖА"

    // 4. Ищем товары, у которых ownerID соответствует этим категориям
    const products = await Product.find({ ownerID: { $in: categoryIDs } });

    if (products.length === 0) {
      return res.status(404).json({ message: "Нет товаров в категории 'РАСПРОДАЖА'" });
    }

    // 5. Перемешиваем товары и берем 15 случайных
    const shuffledProducts = products.sort(() => Math.random() - 0.5).slice(0, 15);

    return res.send(shuffledProducts);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

productRouter.get('/:id', async (req, res, next) => {
  try {
    const productRes = await Product.findOne({ goodID: req.params.id });
    return res.send(productRes);
  } catch (e) {
    return next(e);
  }
});

productRouter.get('/get/favorites', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const favoriteProductsId = user.favorites;

    // Добавляем пагинацию
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = 20;
    const skip = (page - 1) * pageSize;

    const products = await Product.find({ goodID: { $in: favoriteProductsId } })
      .skip(skip)
      .limit(pageSize);

    if (!products || products.length === 0) {
      return res.send({ message: 'You do not have favorite Products' });
    }

    // Добавляем информацию о пагинации в ответ
    const totalProducts = await Product.countDocuments({ goodID: { $in: favoriteProductsId } });
    const totalPages = Math.ceil(totalProducts / pageSize);

    return res.json({
      products,
      pageInfo: {
        currentPage: page,
        totalPages,
        pageSize,
        totalItems: totalProducts,
      },
    });
  } catch (e) {
    return next(e);
  }
});

productRouter.delete('/:id/images/:index', auth, permit('admin', 'director'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ message: 'Not found product!' });
    }

    if (user.role === 'admin' || user.role === 'director') {
      const index = parseInt(req.params.index);
      if (product.images && index >= 0 && index < product.images.length) {
        const deletingImage = product.images[index];
        product.images.splice(index, 1);
        await product.save();
        await fs.unlink('public/' + deletingImage);
        res.send({
          message: {
            en: 'Image deleted successfully',
            ru: 'картинка успешно удалена',
          },
        });
      } else {
        return res.status(404).send({ message: 'Not found image!' });
      }
    } else {
      return res.status(403).send({ message: 'You do not have permission!' });
    }
  } catch (e) {
    return next(e);
  }
});

productRouter.get('/search/get', async (req, res, next) => {
  try {
    const searchTerm: string = req.query.text as string;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = 20;
    if (searchTerm.length < 3) {
      return res.status(400).send('Search term should be at least 3 characters long');
    }
    const regex = new RegExp(searchTerm, 'i');
    const skip = (page - 1) * pageSize;
    const products = await Product.find({ name: { $regex: regex } })
      .skip(skip)
      .limit(pageSize);
    const totalProducts = await Product.countDocuments({ name: { $regex: regex } });
    const totalPages = Math.ceil(totalProducts / pageSize);

    res.send({
      products,
      pageInfo: {
        currentPage: page,
        totalPages,
        pageSize,
        totalItems: totalProducts,
      },
    });
  } catch (e) {
    return next(e);
  }
});

productRouter.get('/search/preview', async (req, res, next) => {
  try {
    const searchTerm: string = req.query.text as string;
    if (searchTerm.length < 3) {
      return res.status(400).send('Search term should be at least 3 characters long');
    }
    const regex = new RegExp(searchTerm, 'i');
    const products = await Product.find({
      $or: [{ name: { $regex: regex } }, { article: { $regex: regex } }],
    }).limit(20);
    const hasMore = products.length === 20;
    res.send({
      results: products,
      hasMore,
    });
  } catch (e) {
    return next(e);
  }
});

export default productRouter;
