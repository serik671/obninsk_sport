import { default as UserModel, User } from '../database/models/user.model';

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

    async updateUser(id: number, user: User) {
        await UserModel.build(user).validate();
        return UserModel.update(user, { where: { id: id } });
    }

    deleteUser(id: number) {
        return UserModel.destroy( { where: { id: id } });
    }
}