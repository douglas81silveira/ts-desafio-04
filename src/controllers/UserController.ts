import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
    userService: UserService;

    constructor(userService: UserService = new UserService()) {
        this.userService = userService;
    }

    createUser = (req: Request, res: Response) => {
        const user = req.body;

        if (!user.name) {
            return res.status(400).json({ message: 'Bad request. Please, insert a username!' });
        }

        if (!user.email) {
            return res.status(400).json({ message: 'Bad request. Please, insert an email!' });
        }

        this.userService.createUser(user.name, user.email);
        return res.status(201).json({ message: 'User created' });
    }

    getAllUsers = (req: Request, res: Response) => {
        const users = this.userService.getAllUsers();
        return res.status(200).json(users);
    }

    deleteUser = (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id);
        this.userService.deleteUser(id);
        return res.status(204).json({});
    }
}

export default UserController;