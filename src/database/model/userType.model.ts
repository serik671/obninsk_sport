import {Model} from "sequelize"

export interface UserType {
    id: number
    name: string
}

export default class UserTypeModel extends Model<UserType> {}