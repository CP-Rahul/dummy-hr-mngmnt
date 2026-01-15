import RequisitionRepository from "../repository/requisition-repository.js";
import CustomError from "../helpers/errors/CustomError.js";
import UserRepository from "../repository/user-repository.js"
import JobRepository from "../repository/job-repository.js";
import { INVALID_DATA, REQUIRED_FIELDS_MISSING, RESOURCE_NOT_FOUND, USER_UNAUTHORIZED } from "../config/server-config.js";

class RequisitionService {
    constructor(repo = new RequisitionRepository(), userRepo = new UserRepository(), jobRepo = new JobRepository()) {
        this.repo = repo;
        this.userRepo = userRepo;
        this.jobRepo = jobRepo;
    }

    createRequisition = async(data) => {
        try {
            if(!data.jobTitle || !data.location || !data.employmentType || !data.requestedBy || !data.jobDescription) {
                throw new CustomError("Required fields are missing", undefined, REQUIRED_FIELDS_MISSING);
            }
            const postedBy = await this.userRepo.get(data.requestedBy);
            if (!postedBy) {
                throw new CustomError("User not found", undefined, RESOURCE_NOT_FOUND);
            }
            if(!postedBy.role || postedBy.role !== "RECRUITER") {
                throw new CustomError("User is not permitted to create requisitions", undefined, USER_UNAUTHORIZED);
            }
            data.lifeCycles.push("DRAFT");
            return await this.repo.create(data);
        } catch (error) {
            throw error;
        }
    }

    submitRequisitionForApproval = async(id) => {
        try {
            if(!id) {
                throw new CustomError("Required fields are missing", undefined, REQUIRED_FIELDS_MISSING);
            }
            const requisition = await this.repo.get(id);
            if (!requisition) {
                throw new CustomError("Requisition not found", undefined, RESOURCE_NOT_FOUND);
            }
            requisition.status = "PENDING_APPROVAL";
            requisition.lifeCycles.push("PENDING_APPROVAL");
            return await this.repo.create(requisition);
        } catch (error) {
            throw error;
        }
    }

    decideRequisition = async(data, id) => {
       try {
         if(!id || !data || !data.status || !data.approval || !data.approval.approvedBy) {
            throw new CustomError("Required parameters are missing", undefined, REQUIRED_FIELDS_MISSING);
        } 
        const requisition = await this.repo.get(id);
         if (!requisition) {
                throw new CustomError("Requisition not found", undefined, RESOURCE_NOT_FOUND);
            }

         if (!requisition.status || requisition.status !== "PENDING_APPROVAL") {
                throw new CustomError("Invalid requisition status", undefined, INVALID_DATA);
            }

        const approvedBy = await this.userRepo.get(data.approval.approvedBy);
        if (!approvedBy) {
                throw new CustomError("Approver is not found", undefined, RESOURCE_NOT_FOUND);
            }

        if(!approvedBy.role || approvedBy.role !== "ADMIN") {
                throw new CustomError("User is not permitted to approve / reject requisitions", undefined, USER_UNAUTHORIZED);
            }

        if(data.status == "APPROVED") {
            const job = {
               requisitionId: requisition.id,
               postedBy: requisition.requestedBy,
               jobTitle: requisition.jobTitle,
               location: requisition.location,
               employmentType: requisition.employmentType,
               openings: requisition.openings,
               jobDescription: requisition.jobDescription
            }

            await this.jobRepo.create(job);

        }
        requisition.status = data.status;
        requisition.approval = data.approval;
        requisition.lifeCycles.push(data.status);

        return await this.repo.create(requisition);
       } catch (error) {
        throw error;
       }
    }

    findRequisitionByStatus = async(status) => {
        console.log(status)
        try {
            if(!status) {
                throw new CustomError("Required fields are missing", undefined, REQUIRED_FIELDS_MISSING);
            }
            const requisition = await this.repo.getAll({status: status});
            if (!requisition || requisition.length === 0) {
                throw new CustomError("Requisition not found", undefined, RESOURCE_NOT_FOUND);
            }
            return requisition;
        } catch (error) {
            throw error;
        }
    }
    
}

export default RequisitionService;