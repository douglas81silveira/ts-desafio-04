export interface User {
    name: string;
    email: string;
}

const db = [
    {
        name: "Joana",
        email: "joana@dio.me",
    }
]

class UserService {
    db: User[];

    constructor (database: User[] = db) {
        this.db = database;
    }
    
    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        this.db.push(user);
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db;
    }

    deleteUser = (id: number) => {
        this.db = this.db.filter((user, i) => i != id);
    }
}

export default UserService;