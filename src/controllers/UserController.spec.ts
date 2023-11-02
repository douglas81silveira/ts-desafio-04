
import UserService from "../services/UserService";
import UserController from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'test',
                email: 'test@dio.me'
            }
        } as Request;

        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({ message: 'User created' });
    });

    it('Deve apresentar erro caso o name não seja informado', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'test@dio.me'
            }
        } as Request;

        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request. Please, insert a username!' });
    });

    it('Deve apresentar erro caso o email não seja informado', () => {
        const mockRequest = {
            body: {
                name: 'test',
                email: ''
            }
        } as Request;

        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request. Please, insert an email!' });
    });
    
    it('Deve chamar getAllUsers', () => {
        const mockRequest = {} as Request;
        const mockResponse = makeMockResponse();

        const mus = jest.spyOn(userController.userService, 'getAllUsers');
        userController.getAllUsers(mockRequest, mockResponse);

        expect(mus).toBeCalled();
    });

    it('Deve chamar deleteUser', () => {
        const mockRequest = makeMockRequest({
            params: {
                id: '0'
            }
        });
        const mockResponse = makeMockResponse();

        const mus = jest.spyOn(userController.userService, 'deleteUser');
        userController.deleteUser(mockRequest, mockResponse);

        expect(mus).toBeCalled();
    });
});