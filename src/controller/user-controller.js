import response from "../helpers/common/response.js";
import UserService from "../service/user-service.js";

class UserController {
     constructor(service = new UserService()) {
            this.service = service;
        }
     createUser = async (req, res) => {
        const data = await this.service.createUser(req.body);
        response(data, res);
    }
}

export default UserController;