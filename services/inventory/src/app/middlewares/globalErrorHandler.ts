import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { IGenericErrorMessage } from "../../interfaces/error";
import config from "@/config";
import handleValidationError from "@/errors/handleValidationError";
import handleZodError from "@/errors/handleZodError";
import handleClientError from "@/errors/handleClientError";
import ApiError from "@/errors/ApiError";

const globalErrorHandler: ErrorRequestHandler = (
	error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode = 500;
	let message = "Something went wrong !";
	let errorMessages: IGenericErrorMessage[] = [];

	if (error instanceof Prisma.PrismaClientValidationError) {
		const simplifiedError = handleValidationError(error);
		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
		errorMessages = simplifiedError.errorMessages;
	} else if (error instanceof ZodError) {
		const simplifiedError = handleZodError(error);
		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
		errorMessages = simplifiedError.errorMessages;
	} else if (error instanceof Prisma.PrismaClientKnownRequestError) {
		const simplifiedError = handleClientError(error);
		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
		errorMessages = simplifiedError.errorMessages;
	} else if (error instanceof ApiError) {
		statusCode = error?.statusCode;
		message = error.message;
		errorMessages = error?.message
			? [
					{
						path: "",
						message: error?.message,
					},
			  ]
			: [];
	} else if (error instanceof Error) {
		message = error?.message;
		errorMessages = error?.message
			? [
					{
						path: "",
						message: error?.message,
					},
			  ]
			: [];
	}

	res.status(statusCode).json({
		success: false,
		message,
		errorMessages,
		stack: config.env !== "production" ? error?.stack : undefined,
	});
};

export default globalErrorHandler;