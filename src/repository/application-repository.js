import CrudRepository from "./crud-repository.js";
import Application from "../model/application.js";

class ApplicationRepository extends CrudRepository {
  constructor() {
    super(Application);
  }
}

export default ApplicationRepository;