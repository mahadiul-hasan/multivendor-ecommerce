import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import globalErrorHandler from "./app/middleware/globalErrorHandler";
// import routers from "./app/routes";
import morgan from "morgan";

const app: Application = express();

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("dev"));

// app.use("/api/v1/", routers);

// global error handler
// app.use(globalErrorHandler);

// handle not found error
app.use((_req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({
		success: true,
		message: "Server Up and running",
	});
	next();
});

export default app;
