import {Router} from 'express';
import {UserController} from './../controllers/user.controller';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/users',async (req, res, next) => {
  try {
    await userController.getAllUsers(req, res);
  }catch(error){
    next(error);
  }
});

userRoutes.get('/user/:id', async (req, res, next) => {
  try{
      await userController.getUser(req, res);
  }catch(error){
    next(error);
  }
})


export default userRoutes;
