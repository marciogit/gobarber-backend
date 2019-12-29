import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  try {
    const user = await User.create({
      name: 'Marcio',
      email: 'marcio@gmail.com',
      password_hash: '123456',
    });
    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
});

export default routes;
