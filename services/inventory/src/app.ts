import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "@/app/middlewares/globalErrorHandler";
import router from "@/app/routes";

const app: Application = express();

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", router);

// global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(404).json({
		success: false,
		message: "Not Found",
		errorMessages: [
			{
				path: req.originalUrl,
				message: "API Not Found",
			},
		],
	});
	next();
});

export default app;
