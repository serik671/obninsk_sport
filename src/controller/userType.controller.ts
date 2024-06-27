import { default as UserTypeModel, UserType } from '../database/model/userType.model';

export default class UserTypeController {
    constructor() {

    }

    async addUserType(userType: UserType) {
        await UserTypeModel.build(userType).validate();
        return UserTypeModel.create(userType);
    }

    getUserTypes(limit?: number, type?: any) {
        if (limit && limit > 0) {
            return UserTypeModel.findAll({ limit: limit });
        }
        return UserTypeModel.findAll();
    }

    getUserType(id: number) {
        return UserTypeModel.findOne({ where: { id: id } });
    }

    async updateUserType(id: number, userType: UserType) {
        await UserTypeModel.build(userType).validate();
        return UserTypeModel.update(userType, { where: { id: id } });
    }

    deleteUserType(id: number) {
        return UserTypeModel.destroy( { where: { id: id } });
    }
}