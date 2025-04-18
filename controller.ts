import { Request, Response, NextFunction } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "./service";

// Create a new supplier
export const createSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const supplier = await createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
};

// Get all suppliers
export const getAllSuppliersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const suppliers = await getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    next(error);
  }
};

// Get a supplier by ID
export const getSupplierByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const supplier = await getSupplierById(req.params.id);
    if (!supplier) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }
    res.status(200).json(supplier);
  } catch (error) {
    next(error);
  }
};

// Update a supplier
export const updateSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const supplier = await updateSupplier(req.params.id, req.body);
    if (!supplier) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }
    res.status(200).json(supplier);
  } catch (error) {
    next(error);
  }
};

// Delete a supplier
export const deleteSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const supplier = await deleteSupplier(req.params.id);
    if (!supplier) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }
    res.status(200).json({ message: "Supplier deleted", supplier });
  } catch (error) {
    next(error);
  }
};
