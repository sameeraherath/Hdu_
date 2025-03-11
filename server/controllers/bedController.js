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


