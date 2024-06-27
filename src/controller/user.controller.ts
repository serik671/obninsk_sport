import { default as UserModel, User } from '../database/model/user.model';

export default class UserController {
    constructor() {

    }

    async addUser(user: User) {
        await UserModel.build(user).validate();
        return UserModel.create(user);
    }

    getUsers(limit?: number, type?: any) {
        if (limit && limit > 0) {
            return UserModel.findAll({ limit: limit });
        }
        return UserModel.findAll();
    }

    getUser(id: number) {
        return UserModel.findOne({ where: { id: id } });
    }

    public async getUserByLogin(login: string){
        return (await UserModel.findOne({where: {login: login}}))?.get();
    }

    async updateUser(id: number, user: User) {
        await UserModel.build(user).validate();
        return UserModel.update(user, { where: { id: id } });
    }

    deleteUser(id: number) {
        return UserModel.destroy( { where: { id: id } });
    }
}