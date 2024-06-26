import { PersonModel, Person } from '../database/model/person.model';

export default class PersonController {
    constructor() {

    }

    async addPerson(person: Person) {
        await PersonModel.build(person).validate();
        return PersonModel.create(person);
    }

    getPersons(limit?: number, type?: any) {
        if (limit && limit > 0) {
            return PersonModel.findAll({ limit: limit });
        }
        return PersonModel.findAll();
    }

    getPerson(id: number) {
        return PersonModel.findOne({ where: { id: id } });
    }

    async updatePerson(id: number, person: Person) {
        await PersonModel.build(person).validate();
        return PersonModel.update(person, { where: { id: id } });
    }

    deletePerson(id: number) {
        return PersonModel.destroy( { where: { id: id } });
    }
}