import { Router } from "express";
import UserController from './controllers/UserController';

export const router = Router();
const userController = new UserController();

// users
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.delete('/users/:id', userController.deleteUser);