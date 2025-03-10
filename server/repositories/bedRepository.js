import { BedMySQL, PatientMySQL } from "../config/mysqlDB.js";

class BedRepository {
  async getAllBeds() {
    return await BedMySQL.findAll({ include: PatientMySQL });
  }

  async assignBed(bedId, patientData) {
    // Check if the bed is available (patientId is null)
    const bed = await BedMySQL.findOne({ where: { id: bedId } });

    if (!bed) {
      throw new Error("Bed not found");
    }

    if (bed.patientId !== null) {
      throw new Error("Bed is already occupied");
    }

    // Create the patient record
    const patient = await PatientMySQL.create(patientData);

    // Update the bed with the patient's ID
    const updated = await BedMySQL.update(
      { patientId: patient.id },
      { where: { id: bedId } }
    );

    return res.status(200).json({ message: "Bed successfully assigned to patient", patientId: patient.id });
  }

}

export default new BedRepository();
