import {Router} from 'express'
import {  RoleController } from '../controllers/role.controller'
import { Request, Response, NextFunction } from 'express'


 const roleRoutes: Router = Router();

const roleController: RoleController = new RoleController()

roleRoutes.get('/role/:id', async (req: Request, res: Response, next: NextFunction)=> {
  try{
   await roleController.getRole(req, res);
  }catch(error){
    next(error);
  }
})
roleRoutes.get('/roles', async (req: Request, res: Response, next: NextFunction)=> {
  try{
   await roleController.getAllRoles(req, res);
  }catch(error){
    next(error);
  }
})
roleRoutes.post('/role', async (req: Request, res: Response, next: NextFunction)=> {
  try{
   await roleController.addRole(req, res);
  }catch(error){
    next(error);
  }
})
roleRoutes.put('/role', async (req: Request, res: Response, next: NextFunction)=> {
  try{
   await roleController.updateRole(req, res);
  }catch(error){
    next(error);
  }
})
roleRoutes.delete('/role/:id', async (req: Request, res: Response, next: NextFunction)=> {
  try{
   await roleController.deleteRole(req, res);
  }catch(error){
    next(error);
  }
})
export default roleRoutes;
