import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
// import globalErrorHandler from "@/app/middlewares/globalErrorHandler";

const app: Application = express();

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("dev"));

// app.use("/api/v1", routes);

// global error handler
// app.use(globalErrorHandler);

//handle not found
app.use((_req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({
		success: true,
		message: "Server Up and running",
	});
	next();
});

export default app;
