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
  const { bedId, patientData } = req.body;
  try {
    const [updated] = await BedRepository.assignBed(bedId, patientData);
    if (updated) {
      res.json({ msg: "Bed assigned successfully" });
    } else {
      res.status(400).json({ msg: "Bed is already occupied or not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
