import CandidateRepository from "../repository/candidate-repository.js";
import CustomError from "../helpers/errors/CustomError.js";
import { INVALID_DATA, REQUIRED_FIELDS_MISSING, RESOURCE_NOT_FOUND } from "../config/server-config.js";

class CandidateService {
    constructor(repo = new CandidateRepository()) {
        this.repo = repo;
    }

    createCandidate = async (data) => {
        try {
            if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.source) {
                throw new CustomError("Required fields are missing", undefined, REQUIRED_FIELDS_MISSING );
            }

            const allowedSources = ["CAREER_PORTAL", "REFERRAL", "LINKEDIN", "AGENCY"];
            if (!allowedSources.includes(data.source)) {
                throw new CustomError("Invalid source value", undefined, "CAND101");
            }
            const existing = await this.repo.getAll({email: data.email});
            console.log(existing)
            if (existing && existing.length !== 0) {
                throw new CustomError("Candidate with this email already exists", undefined, INVALID_DATA);
            }
            return await this.repo.create(data);
        } catch (error) {
            throw error;
        }
    }

    getCandidateById = async (id) => {
        if (!id) {
            throw new CustomError("Candidate ID is required", undefined, REQUIRED_FIELDS_MISSING);
        }

        const candidate = await this.repo.get(id);
        if (!candidate) {
            throw new CustomError("Candidate not found", undefined, RESOURCE_NOT_FOUND);
        }

        return candidate;
    }
}

export default CandidateService;
