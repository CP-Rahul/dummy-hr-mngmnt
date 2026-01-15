import CrudRepository from "./crud-repository.js";
import Job from "../model/job.js";

class JobRepository extends CrudRepository {
  constructor() {
    super(Job);
  }
}

export default JobRepository;