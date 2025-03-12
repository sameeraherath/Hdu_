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
    console.log("Incoming request:", req.body);

    const { patientData } = req.body;
    const { bedId } = patientData;

    if (!bedId) {
      console.error("Bed ID is missing in request:", req.body);
      return res.status(400).json({ msg: "Bed ID is required" });
    }

    if (!patientData || Object.keys(patientData).length === 0) {
      console.error("Patient data is missing or empty");
      return res.status(400).json({ msg: "Patient data is required" });
    }

    console.log("Received patientData:", patientData);

    const patientDetails = {
      ...patientData,
      admitDateTime: new Date(),
    };

    const bed = await BedMySQL.findOne({ where: { id: bedId } });
    if (!bed) {
      console.error("Bed not found:", bedId);
      return res.status(404).json({ msg: "Bed not found" });
    }

    if (bed.patientId !== null) {
      console.error("Bed is already occupied by another patient:", bedId);
      return res.status(400).json({ msg: "Bed is already occupied" });
    }

    const patient = await PatientMySQL.create(patientDetails);

    const [updatedCount] = await BedMySQL.update(
      { patientId: patient.id },
      { where: { id: bedId, patientId: null } }
    );

    if (updatedCount > 0) {
      return res.json({ msg: "Bed assigned successfully" });
    } else {
      console.error("Failed to update the bed:", bedId);
      return res.status(400).json({ msg: "Failed to assign bed" });
    }
  } catch (err) {
    console.error("assignBed Error:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
}

export async function deAssignBed(req, res) {
  try {
    const { bedId } = req.params;

    if (!bedId) {
      console.error("Bed ID is missing in request:", req.body);
      return res.status(400).json({ msg: "Bed ID is required" });
    }

    const bed = await BedMySQL.findOne({ where: { id: bedId } });
    if (!bed) {
      console.error("Bed not found:", bedId);
      return res.status(404).json({ msg: "Bed not found" });
    }

    if (bed.patientId === null) {
      console.error("Bed is already unoccupied:", bedId);
      return res.status(400).json({ msg: "Bed is already unoccupied" });
    }

    const [updatedCount] = await BedMySQL.update(
      { patientId: null },
      { where: { id: bedId } }
    );

    if (updatedCount > 0) {
      return res.json({ msg: "Bed deassigned successfully" });
    } else {
      console.error("Failed to update the bed:", bedId);
      return res.status(400).json({ msg: "Failed to deassign bed" });
    }
  } catch (err) {
    console.error("deAssignBed Error:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
}
