import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.displayName || !req.body.phone) {
      return res.status(400).send({
        errors: {
          username: !req.body.username ? {message: 'Username is required!'} : null,
          password: !req.body.password ? {message: 'Password is required!'} : null,
          displayName: !req.body.displayName ? {message: 'Display name is required!'} : null,
          phone: !req.body.phone ? {message: 'Phone is required!'} : null,
        },
      });
    }
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      phone: req.body.phone,
    });

    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});
usersRouter.post('/sessions', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        errors: {
          username: !req.body.username ? {message: 'Username is required!'} : null,
          password: !req.body.password ? {message: 'Password is required!'} : null,
        },
      });
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send({error: 'Username or Password not found!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Username or Password not found' });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) return res.status(204).send();

    const [_bearer, token] = headerValue.split(' ');

    if (!token) return res.status(204).send();

    const user = await User.findOne({token});

    if (!user) return res.status(204).send();

    user.generateToken();
    await user.save();

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default usersRouter