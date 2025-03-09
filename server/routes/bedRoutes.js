import { Router } from "express";
import { getBeds, assignBed } from "../controllers/bedController.js";

const router = Router();

router.get("/", getBeds);
router.post("/assign", assignBed);

export default router;
