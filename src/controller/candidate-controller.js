import response from "../helpers/common/response.js";
import CandidateService from "../service/candidate-service.js";

class CandidateController {
    constructor(service = new CandidateService()) {
        this.service = service;
    }

    createCandidate = async (req, res) => {
        const data = await this.service.createCandidate(req.body);
        response(data, res);
    }

     getCandidateById = async (req, res) => {
        const data = await this.service.getCandidateById(req.params.id);
        response(data, res);
    }
}

export default CandidateController;
