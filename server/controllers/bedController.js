import BedRepository from "../repositories/bedRepository.js";
import { BedMySQL, PatientMySQL } from "../config/mysqlDB.js";

export async function getBeds(req, res) {
  try {
    const beds = await BedRepository.getAllBeds();
    res.json(beds);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}







export async function assignBed(req, res) {
  try {
    console.log("🚀 Incoming request:", req.body);

    const { patientData } = req.body;
    const { bedId } = patientData;

    // Ensure bedId is present in the request
    if (!bedId) {
      console.error("❌ Bed ID is missing in request:", req.body);
      return res.status(400).json({ msg: "Bed ID is required" });
    }

    // Ensure patientData is not empty
    if (!patientData || Object.keys(patientData).length === 0) {
      console.error("❌ Patient data is missing or empty");
      return res.status(400).json({ msg: "Patient data is required" });
    }

    console.log("✅ Received patientData:", patientData);

    // Add admitDateTime to the patient details
    const patientDetails = {
      ...patientData,
      admitDateTime: new Date(),
    };

    // Check if the bed exists and is available
    const bed = await BedMySQL.findOne({ where: { id: bedId } });
    if (!bed) {
      console.error("❌ Bed not found:", bedId);
      return res.status(404).json({ msg: "Bed not found" });
    }

    if (bed.patientId !== null) {
      console.error("❌ Bed is already occupied by another patient:", bedId);
      return res.status(400).json({ msg: "Bed is already occupied" });
    }

    // Create the patient record
    const patient = await PatientMySQL.create(patientDetails);

    // Attempt to update the bed with the patient's ID
    const [updatedCount] = await BedMySQL.update(
      { patientId: patient.id },
      { where: { id: bedId, patientId: null } }
    );

    console.log("🚀 Bed assignment update result:", updatedCount);

    // Check if the bed update was successful
    if (updatedCount > 0) {
      return res.json({ msg: "Bed assigned successfully" });
    } else {
      console.error("❌ Failed to update the bed:", bedId);
      return res.status(400).json({ msg: "Failed to assign bed" });
    }
  } catch (err) {
    console.error("🚨 assignBed Error:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
}









