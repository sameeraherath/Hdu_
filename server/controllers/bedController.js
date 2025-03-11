import BedRepository from "../repositories/bedRepository.js";

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
    const { bedId, patientData } = req.body;
    const updatedBed = await BedRepository.assignBed(bedId, patientData);
    res.json(updatedBed);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
