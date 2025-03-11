import BedRepository from "../repositories/bedRepository.js";

export async function assignBed(req, res) {
  try {
    console.log("🚀 ~ assignBed ~ req.body:", req.body);
    const { bedId, patientData } = req.body;

    const requiredFields = [
      "fullName",
      "age",
      "birthDate",
      "sex",
      "condition",
      "contactDetails",
      "frequencyMeasure",
    ];
    const missingFields = requiredFields.filter(
      (field) =>
        !patientData ||
        patientData[field] === undefined ||
        patientData[field] === null
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        msg: "Missing required patient data",
        missingFields,
      });
    }

    const updatedBed = await BedRepository.assignBed(bedId, patientData);
    res.json(updatedBed);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function getBeds(req, res) {
  try {
    const beds = await BedRepository.getAllBeds();
    res.json(beds);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
