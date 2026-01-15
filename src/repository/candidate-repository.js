import CrudRepository from "./crud-repository.js";
import Candidate from "../model/candidate.js";

class CandidateRepository extends CrudRepository {
  constructor() {
    super(Candidate);
  }
}

export default CandidateRepository;