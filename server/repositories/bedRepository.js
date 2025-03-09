import BedMySQL from "../models/BedMySQL.js";
import PatientMySQL from "../models/PatientMySQL.js";

class BedRepository {
  async getAllBeds() {
    return await BedMySQL.findAll({ include: PatientMySQL });
  }

  async assignBed(bedId, patientData) {
    const patient = await PatientMySQL.create(patientData);
    return await BedMySQL.update(
      { patientId: patient.id },
      { where: { id: bedId, patientId: null } }
    );
  }
}

export default new BedRepository();
