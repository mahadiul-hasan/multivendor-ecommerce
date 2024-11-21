import ApiError from "@/errors/ApiError";
import prisma from "@/shared/prisma";
import { Inventory } from "@prisma/client";

const create = async (payload: Inventory): Promise<Partial<Inventory>> => {
	const result = await prisma.inventory.create({
		data: {
			...payload,
			histories: {
				create: {
					actionType: "IN",
					quantityChanged: payload.quantity,
					lastQuantity: 0,
					newQuantity: payload.quantity,
				},
			},
		},
		select: {
			id: true,
			quantity: true,
		},
	});

	return result;
};

const getAll = async () => {
	const result = await prisma.inventory.findMany({
		select: { id: true, quantity: true },
	});

	return result;
};

const getById = async (id: string): Promise<Partial<Inventory>> => {
	const result = await prisma.inventory.findUnique({
		where: { id },
		select: { quantity: true },
	});

	if (!result) {
		throw new ApiError(404, "Inventory not found");
	}

	return result;
};

const getDetails = async (id: string): Promise<Partial<Inventory>> => {
	const result = await prisma.inventory.findUnique({
		where: { id },
		include: {
			histories: {
				orderBy: {
					createdAt: "desc",
				},
			},
		},
	});

	if (!result) {
		throw new ApiError(404, "Inventory not found");
	}

	return result;
};

const update = async (
	id: string,
	payload: { quantity: number; actionType: string }
): Promise<Partial<Inventory>> => {
	console.log(payload);
	const inventory = await prisma.inventory.findUnique({
		where: { id },
	});

	if (!inventory) {
		throw new ApiError(404, "Inventory not found");
	}

	const lastHistory = await prisma.history.findFirst({
		where: { inventoryId: id },
		orderBy: { createdAt: "desc" },
	});

	let newQuantity = inventory.quantity;

	if (payload.actionType === "IN") {
		newQuantity += payload.quantity;
	} else if (payload.actionType === "OUT") {
		newQuantity -= payload.quantity;
	} else {
		throw new ApiError(400, "Invalid action type");
	}

	const result = await prisma.inventory.update({
		where: { id },
		data: {
			quantity: newQuantity,
			histories: {
				create: {
					actionType: payload.actionType,
					quantityChanged: payload.quantity,
					lastQuantity: lastHistory?.newQuantity || 0,
					newQuantity,
				},
			},
		},
		select: {
			id: true,
			quantity: true,
		},
	});

	return result;
};

export const InventoryService = {
	create,
	getAll,
	getById,
	getDetails,
	update,
};
