import express from "express";
import { InventoryRoutes } from "@/app/modules/inventory/inventory.route";

const router = express.Router();

const moduleRoutes = [
	{
		path: "/inventories",
		route: InventoryRoutes,
	},
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
