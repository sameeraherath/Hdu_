import { BedMySQL, PatientMySQL } from "../config/mysqlDB.js";

class BedRepository {
  async getAllBeds() {
    return await BedMySQL.findAll({ include: PatientMySQL });
  }

  async assignBed(bedId, patientData) {
    console.log("D-Log ** bedId", bedId);
    console.log("D-Log ** patientData", patientData);

    try {
      await BedMySQL.update(
        { patientId: patient.id },
        { where: { id: bedId, patientId: null } }
      );
      await PatientMySQL.create(patientData);

      //return json
    } catch (error) {}
  }
}

export default new BedRepository();
