import {Model} from "sequelize"

export interface User {
    id: number
    login: string
    passwd: string
    type_id: number
}

export default class UserModel extends Model<User> {}