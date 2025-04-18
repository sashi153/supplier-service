import { Supplier, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new supplier
export const createSupplier = async (
  supplierData: Omit<Supplier, "id" | "createdAt" | "updatedAt">
): Promise<Supplier> => {
  return prisma.supplier.create({
    data: supplierData,
  });
};

// Get all suppliers
export const getAllSuppliers = async (): Promise<Supplier[]> => {
  return prisma.supplier.findMany();
};

// Get a supplier by ID
export const getSupplierById = async (id: string): Promise<Supplier | null> => {
  return prisma.supplier.findUnique({
    where: { id },
  });
};

// Update a supplier
export const updateSupplier = async (
  id: string,
  supplierData: Partial<Supplier>
): Promise<Supplier | null> => {
  return prisma.supplier.update({
    where: { id },
    data: supplierData,
  });
};

// Delete a supplier
export const deleteSupplier = async (id: string): Promise<Supplier | null> => {
  return prisma.supplier.delete({
    where: { id },
  });
};
