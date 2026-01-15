import response from "../helpers/common/response.js";
import ApplicationService from "../service/application-service.js";

class ApplicationController {
    constructor(service = new ApplicationService()) {
        this.service = service;
    }

    createApplication = async (req, res) => {
        const data = await this.service.createApplication(req.body);
        response(data, res);
    }

    updateApplicationStage = async (req, res) => {
    const data = await this.service.updateApplicationStage(req.params.id, req.body);
    response(data, res);
    }

}

export default ApplicationController;
