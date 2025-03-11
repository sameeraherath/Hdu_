import { BedMySQL, PatientMySQL } from "../config/mysqlDB.js";

class BedRepository {
  async getAllBeds() {
    return await BedMySQL.findAll({ include: PatientMySQL });
  }

  async assignBed(bedId, patientData) {

}

export default new BedRepository();
