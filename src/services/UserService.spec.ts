import UserService, { User } from "./UserService"

describe('UserService', () => {
    const mockDb:User[] = [];
    const userService = new UserService(mockDb);
    
    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log');
        userService.createUser('test', 'test@dio.me');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb);
    });
});