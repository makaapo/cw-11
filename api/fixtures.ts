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

  const [
    cpuCategory,
    gpuCategory,
    ssdCategory
  ] = await Category.create({
    title: 'CPUs',
  }, {
    title: 'GPUs',
  }, {
    title: 'SSDs',
  });


  const [abdumalik, makapo] = await User.create({
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
  });

  await Product.create({
    user: abdumalik,
    title: 'Intel Core i9',
    price: 500,
    category: cpuCategory,
    image: 'fixtures/cpu.jpg',
    description: 'Central Processing Units',
  }, {
    user: makapo,
    title: 'Nvidia RTX 4090',
    price: 1200,
    category: gpuCategory,
    image: 'fixtures/gpu.webp',
    description: 'Graphic Processing Units',
  },{
      user: makapo,
      title: 'HGST SN150 1,6 ТБ',
      price: 1800,
      category: ssdCategory,
      image: 'fixtures/ssd.jpg',
      description: 'Solid-State Drive',
    }

  );


  await db.close();
};

run().catch(console.error);