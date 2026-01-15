import ApplicationRepository from "../repository/application-repository.js";
import CandidateRepository from "../repository/candidate-repository.js";
import JobRepository from "../repository/job-repository.js";
import CustomError from "../helpers/errors/CustomError.js";
import UserRepository from "../repository/user-repository.js";
import { INVALID_DATA, REQUIRED_FIELDS_MISSING, RESOURCE_NOT_FOUND, USER_UNAUTHORIZED } from "../config/server-config.js";

class ApplicationService {
  constructor(
    repo = new ApplicationRepository(),
    candidateRepo = new CandidateRepository(),
    jobRepo = new JobRepository(),
    userRepo = new UserRepository()
  ) {
    this.repo = repo;
    this.candidateRepo = candidateRepo;
    this.jobRepo = jobRepo;
    this.userRepo = userRepo;
  }

  createApplication = async (data) => {
    if (!data.candidateId || !data.jobId) {
      throw new CustomError("Required fields are missing", undefined, REQUIRED_FIELDS_MISSING);
    }

    const candidate = await this.candidateRepo.get(data.candidateId);
    if (!candidate) {
      throw new CustomError("Candidate not found", undefined, RESOURCE_NOT_FOUND);
    }

    const job = await this.jobRepo.get(data.jobId);
    if (!job) {
      throw new CustomError("Job not found", undefined, RESOURCE_NOT_FOUND);
    }

    const existing = await this.repo.getAll({
      candidateId: data.candidateId,
      jobId: data.jobId,
    });

    if (existing?.length) {
      throw new CustomError(
        "Candidate has already applied for this job",
        undefined,
        INVALID_DATA
      );
    }

    const applicationData = {
      candidateId: data.candidateId,
      jobId: data.jobId,
      stage: "APPLIED",
      lifeCycle: ["APPLIED"],
    };

    return await this.repo.create(applicationData);
  };

  updateApplicationStage = async (id, data) => {
    if (!id || !data || !data.stage || !data.actionerId) {
      throw new CustomError("Required fields are missing", undefined, REQUIRED_FIELDS_MISSING);
    }

    const actioner = await this.userRepo.get(data.actionerId);

    if (actioner && actioner.role && actioner.role !== "RECRUITER") {
      throw new CustomError(
        "User not found / not autherized to do this operation",
        undefined,
        USER_UNAUTHORIZED
      );
    }

    const application = await this.repo.get(id);
    if (!application) {
      throw new CustomError("Application not found", undefined, RESOURCE_NOT_FOUND);
    }

    const allowedStages = [
      "APPLIED",
      "INTERVIEW",
      "OFFERED",
      "HIRED",
      "REJECTED",
    ];

    if (!allowedStages.includes(data.stage)) {
      throw new CustomError("Invalid application stage", undefined, INVALID_DATA);
    }

    if (data.stage === application.stage) {
      throw new CustomError(
        "Application is already in provided stage",
        undefined,
        "APP207"
      );
    }

    if (data.stage === "REJECTED" && !data.reason) {
      throw new CustomError(
        "Reason is required for rejection",
        undefined,
        REQUIRED_FIELDS_MISSING
      );
    }

    application.stage = data.stage;
    application.reason = data.reason || null;
    application.lifeCycle.push(data.stage);

    return await this.repo.create(application);
  };
}

export default ApplicationService;
