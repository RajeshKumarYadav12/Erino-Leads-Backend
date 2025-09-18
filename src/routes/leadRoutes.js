import express from "express";
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createLead);
router.get("/", protect, getLeads);
router.get("/:id", protect, getLead);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

export default router;
