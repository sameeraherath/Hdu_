import PatientMySql from "../models/PatientMySQL.js";

class PatientRepository {
  async createPatient(patientData) {
    return await PatientMySql.create(patientData);
  }
}

export default new PatientRepository();
