import { Request, Response } from "express";
import catchAsync from "@/shared/catchAsync";
import sendResponse from "@/shared/sendResponse";
import { InventoryService } from "./inventory.service";

const create = catchAsync(async (req: Request, res: Response) => {
	const result = await InventoryService.create(req.body);
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Inventory created successfully!",
		data: result,
	});
});

const getAll = catchAsync(async (req: Request, res: Response) => {
	const result = await InventoryService.getAll();
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Inventory retrieved successfully!",
		data: result,
	});
});

const getById = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await InventoryService.getById(id);
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Inventory retrieved successfully!",
		data: result,
	});
});

const getDetails = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await InventoryService.getDetails(id);
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Inventory details retrieved successfully!",
		data: result,
	});
});

const update = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await InventoryService.update(id, req.body);
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Inventory updated successfully!",
		data: result,
	});
});

export const InventoryController = {
	create,
	getAll,
	getById,
	getDetails,
	update,
};
