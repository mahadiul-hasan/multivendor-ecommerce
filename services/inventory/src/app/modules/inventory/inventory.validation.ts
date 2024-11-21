import { ActionType } from "@prisma/client";
import { z } from "zod";

const create = z.object({
	body: z.object({
		productId: z.string({
			required_error: "Product id is required",
		}),
		sku: z.string({
			required_error: "SKU is required",
		}),
		quantity: z.number({
			required_error: "Quantity should be at least 0",
		}),
	}),
});

const update = z.object({
	body: z.object({
		quantity: z.number().int(),
		actionType: z.nativeEnum(ActionType),
	}),
});

export const InventoryDTOSchema = {
	create,
	update,
};
