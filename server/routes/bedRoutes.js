import { Router } from "express";
import {
  getBeds,
  assignBed,
  deAssignBed,
} from "../controllers/bedController.js";

const router = Router();

router.get("/", getBeds);
router.post("/assign", assignBed);
router.delete("/:bedId", deAssignBed);

export default router;
