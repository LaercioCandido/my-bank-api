import express from "express";
import winston from "winston";
import accountsRouter from "./routes/accounts.js";
import { promises as fs } from "fs";

const { readFile, writeFile} = fs;

global.fileName = "accounts.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
	level: "silly",
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: "my-bank-api.log" })
	],
	format: combine(
		label({ label: "my_bank-api"}),
		timestamp(),
		myFormat
	)
})

const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
	try {
		await readFile(global.fileName);
		global.logger.info("Servidor rodando perfeitamente!");
	} catch (err) {
		const initialJson = {
			nextId: 1,
			accounts: []
		}
		writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
				global.logger.info("Servidor rodando perfeitamente e arquivo criado!");
			}).catch(err => {
				global.logger.error(err);
			});
	}
});
