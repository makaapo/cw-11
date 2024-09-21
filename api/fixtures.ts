import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';
import Product from './models/Product';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('products');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Skipping drop...');
  }
  const [abdumalik, makapo] = await User.create([
    {
      username: 'abdumalik',
      password: '221096',
      displayName: 'Малик',
      phone: '4184441884',
      token: crypto.randomUUID(),
    },
    {
      username: 'makapo',
      password: '221096',
      displayName: 'Макар',
      phone: '987654',
      token: crypto.randomUUID(),
    }
  ]);
  const [cpuCategory, gpuCategory, ssdCategory] = await Category.create([
    {title: 'CPUs'},
    {title: 'GPUs'},
    {title: 'SSDs'}
  ]);

  await Product.create([
    {
      user: abdumalik._id,
      title: 'Intel Core i9',
      price: 500,
      category: cpuCategory._id,
      image: 'fixtures/cpu.webp',
      description: 'Central Processing Units',
    },
    {
      user: makapo._id,
      title: 'Nvidia RTX 4090',
      price: 1200,
      category: gpuCategory._id,
      image: 'fixtures/gpu.webp',
      description: 'Graphic Processing Units',
    },
    {
      user: makapo._id,
      title: 'HGST SN150 1,6 ТБ',
      price: 1800,
      category: ssdCategory._id,
      image: 'fixtures/ssd.jpg',
      description: 'Solid-State Drive',
    }
  ]);


  await db.close();
};

run().catch(console.error);