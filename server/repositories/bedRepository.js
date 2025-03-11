import { BedMySQL, PatientMySQL } from "../config/mysqlDB.js";

class BedRepository {
  async getAllBeds() {
    return await BedMySQL.findAll({
      include: { model: PatientMySQL },
    });
  }

  async assignBed(bedId, patientData) {
    const bed = await BedMySQL.findByPk(bedId);

    if (!bed) {
      throw new Error("Bed not found");
    }

    const patient = await PatientMySQL.create(patientData);

    bed.patientId = patient.id;
    await bed.save();

    return bed;
  }
}

export default new BedRepository();
