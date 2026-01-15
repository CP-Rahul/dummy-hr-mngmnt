import JobRepository from "../repository/job-repository.js"
import CustomError from "../helpers/errors/CustomError.js";
import ApplicationRepository from "../repository/application-repository.js";
import { REQUIRED_FIELDS_MISSING, RESOURCE_NOT_FOUND } from "./config/server-config.js";

class JobService {
    constructor(repository = new JobRepository(), appRepo = new ApplicationRepository()) {
        this.repository = repository;
        this.appRepo = appRepo
    }
    async getAllJob() {
        try {
            const res = await this.repository.getAll();
            return res;
        } catch (error) {
            throw error;
        }
    }

     async getJobById(id) {
        try {
            const res = await this.repository.get(id);
            if(!res) {
                throw CustomError("The job is not found", undefined, RESOURCE_NOT_FOUND);
            }
            return res;
        } catch (error) {
            throw error;
        }
    }

    getApplicationsByJobId = async (jobId) => {
        if (!jobId) {
            throw new CustomError("Job ID is required", undefined, REQUIRED_FIELDS_MISSING);
        }
    
        const job = await this.repository.get(jobId);
        if (!job) {
            throw new CustomError("Job not found", undefined, RESOURCE_NOT_FOUND);
        }
        
        const applications = await this.appRepo.getAll({ jobId });
    
        if (!applications || applications.length === 0) {
            throw new CustomError("No applications found for this job", undefined, RESOURCE_NOT_FOUND);
        }
    
        return applications;
    }
    
}

export default JobService;