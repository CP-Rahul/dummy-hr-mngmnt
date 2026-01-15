import response from "../helpers/common/response.js";
import JobService from "../service/job-service.js"

class JobController {
     constructor(service = new JobService()) {
            this.service = service;
        }
     getAllJob = async (req, res) => {
        const data = await this.service.getAllJob();
        response(data, res);
    }

    getJobById = async (req, res) => {
        const data = await this.service.getJobById(req.params.id);
        response(data, res);
    }

    getApplicationsByJobId = async (req, res) => {
        const data = await this.service.getApplicationsByJobId(req.params.id);
        response(data, res);
     }
}

export default JobController;