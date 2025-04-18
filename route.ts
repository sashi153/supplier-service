import express from "express";
import {
  createSupplierController,
  getAllSuppliersController,
  getSupplierByIdController,
  updateSupplierController,
  deleteSupplierController,
} from "./controller";

const router = express.Router();

// Supplier routes
router.post("/", createSupplierController);
router.get("/", getAllSuppliersController);
router.get("/:id", getSupplierByIdController);
router.put("/:id", updateSupplierController);
router.delete("/:id", deleteSupplierController);

export default router;
