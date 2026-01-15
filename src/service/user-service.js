import UserRepository from "../repository/user-repository.js"
import CustomError from "../helpers/errors/CustomError.js";
import { INVALID_DATA, REQUIRED_FIELDS_MISSING } from "../config/server-config.js";

class UserService {
    constructor(repository = new UserRepository()) {
        this.repository = repository;
    }
    async createUser(data) {
        try {
            if(!data.firstName || !data.lastName || !data.email || !data.role) {
                throw new CustomError("Required fields are missing", undefined, REQUIRED_FIELDS_MISSING);
            }
            const isExist = await this.repository.getAll({email: data.email});
            console.log(isExist);
            if(isExist) {
                throw new CustomError("Email already exists", undefined, INVALID_DATA);
            }
            const res = await this.repository.create(data);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;