import CrudRepository from "./crud-repository.js";
import Requisition from "../model/requisition.js";

class RequisitionRepository extends CrudRepository {
  constructor() {
    super(Requisition);
  }
}

export default RequisitionRepository;