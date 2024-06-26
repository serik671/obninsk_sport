import { Model } from "sequelize"

export interface Person {
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    email: string,
    user_id: number
}

export class PersonModel extends Model<Person> { }