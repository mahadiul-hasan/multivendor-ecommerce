import express from "express";
import validateRequest from "@/app/middlewares/validateRequest";
import { InventoryDTOSchema } from "./inventory.validation";
import { InventoryController } from "./inventory.controller";

const router = express.Router();

router.patch(
	"/:id",
	validateRequest(InventoryDTOSchema.update),
	InventoryController.update
);

router.post(
	"/",
	validateRequest(InventoryDTOSchema.create),
	InventoryController.create
);

router.get("/:id", InventoryController.getById);
router.get("/:id/details", InventoryController.getDetails);
router.get("/", InventoryController.getAll);

export const InventoryRoutes = router;
