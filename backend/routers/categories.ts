import mongoose from 'mongoose';
import express from 'express';
import Category from '../models/Category';
import Product from '../models/Product';

const categoryRouter = express.Router();

categoryRouter.post('/', async (req, res, next) => {
  try {
    const category = new Category({
      name: req.body.name,
    });

    await category.save();
    return res.send({ message: 'created successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

categoryRouter.get('/', async (req, res, next) => {
  try {
    const categoryRes = await Category.find();
    return res.send(categoryRes);
  } catch (e) {
    return next(e);
  }
});

categoryRouter.get('/:id', async (req, res, next) => {
  try {
    const categoryRes = await Category.findOne({ ID: req.params.id });
    return res.send(categoryRes);
  } catch (e) {
    return next(e);
  }
});

// Новый роут: получение случайных картинок товаров для категорий

const getNestedCategories = async (categoryIDs: string[]): Promise<string[]> => {
  const allCategories = new Set(categoryIDs);
  const queue = [...categoryIDs];

  while (queue.length) {
    const currentID = queue.shift();
    const children = await Category.find({ ownerID: currentID }).select('ID').lean();

    for (const child of children) {
      if (!allCategories.has(child.ID)) {
        allCategories.add(child.ID);
        queue.push(child.ID);
      }
    }
  }

  return Array.from(allCategories);
};

categoryRouter.post('/random-images', async (req, res) => {
  try {
    const { categoryIDs }: { categoryIDs: string[] } = req.body; // Явно указываем тип

    if (!Array.isArray(categoryIDs) || categoryIDs.length === 0) {
      return res.status(400).send({ error: 'categoryIDs must be a non-empty array' });
    }

    const result: { ID: string; images: string[] }[] = [];

    for (const categoryID of categoryIDs) {
      // Теперь у categoryID есть тип string
      const nestedCategories = await getNestedCategories([categoryID]);

      const products = await Product.find({ ownerID: { $in: nestedCategories } })
        .select('images')
        .lean();

      if (products.length > 0) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        result.push({ ID: categoryID, images: randomProduct.images ?? [] });
      } else {
        result.push({ ID: categoryID, images: [] });
      }
    }

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
});

export default categoryRouter;
