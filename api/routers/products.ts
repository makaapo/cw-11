import express from 'express';
import {imagesUpload} from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';
import {ProductMutation} from '../types';
import Product from '../models/Product';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    let products;

    if (req.query.category) {
      products = await Product.find({category: req.query.category});
    } else {
      products = await Product.find();
    }

    return res.send(products);
  } catch (e) {
    return next(e);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      res.status(400).send({error: "Wrong product id!"});
    }
    const product = await Product.findById(req.params.id)
      .populate('user', '-username')
      .populate('category');

    if (!product) {
      return res.status(404).send({error: 'Product not found!'});
    }
    return res.send(product);
  } catch (e) {
    return next(e);
  }
});

productsRouter.post('/', imagesUpload.single('image'), auth, async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user?._id) {
        return res.status(400).send({error: 'User ID is wrong!'});
      }

      const productsData: ProductMutation = {
        user: req.user?._id,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        price: parseFloat(req.body.price),
        image: req.file ? req.file.filename : null,
      };

      const product = new Product(productsData);
      await product.save();
      return res.send(product);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }

      return next(e);
    }
  },
);
productsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user?._id) {
      return res.status(400).send({error: 'User ID is wrong!'});
    }
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({error: 'Product not found!'});
    }
    const user = req.user?._id;
    if (user && product) {
      await Product.findOneAndDelete({
        _id: req.params.id,
        user: req.user?._id,
      });
    } else {
      return res.status(403).send('You are not the author of this items');
    }
    return res.send({message: 'Product was successfully deleted '});
  } catch (e) {
    return next(e);
  }
});

export default productsRouter;