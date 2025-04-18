import { createSupplierController } from "../controller";
import { Request, Response, NextFunction } from "express";

jest.mock("../service", () => ({
  createSupplier: jest.fn().mockResolvedValue({
    id: "123",
    name: "Test Supplier",
    email: "test@example.com",
  }),
}));

describe("Supplier Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {
        name: "Test Supplier",
        email: "test@example.com",
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it("should create a supplier", async () => {
    await createSupplierController(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
