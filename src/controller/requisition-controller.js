import response from "../helpers/common/response.js";
import RequisitionService from "../service/requisition-service.js";

class RequisitionController {
    constructor(service = new RequisitionService()) {
        this.service = service;
    }

    createRequisition = async (req, res) => {
        const data = await this.service.createRequisition(req.body);
        response(data, res);
    }

    submitRequisitionForApproval = async (req, res) => {
        const data = await this.service.submitRequisitionForApproval(req.params.id);
        response(data, res);
    }

    decideRequisition = async (req, res) => {
        const data = await this.service.decideRequisition(req.body, req.params.id);
        response(data, res);
    }

    findRequisitionByStatus = async (req, res) => {
        console.log(req.query.status);
        const data = await this.service.findRequisitionByStatus(req.query.status);
        response(data, res);
    }
}

export default RequisitionController;