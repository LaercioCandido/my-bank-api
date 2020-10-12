import express from "express";
import { promises as fs } from "fs";
import cors from "cors";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res, next) => {
	try {
		let account = req.body;

		//validação dos campos
		if (!account.name || account.balance == null) {
			throw new Error("Name e Balance são obrigatórios!");
		}

		const data = JSON.parse(await readFile(global.fileName));

		account = {
			id: data.nextId,
			name: account.name,
			balance: account.balance
		};
		data.nextId++;
		data.accounts.push(account);

		await writeFile(global.fileName, JSON.stringify(data, null, 2));
		res.send(account);
		global.logger.info(`POST /account - ${JSON.stringify(account)}`);
	} catch (err) {
		next(err);
	}
});

// se quiser liberar somente este método pra cors:
// router.get("/", cors(), async (req, res, next) => {
router.get("/", async (req, res, next) => {
	try {
		const data = JSON.parse(await readFile(global.fileName));
		delete data.nextId;
		res.send(data);
		global.logger.info("GET /account");
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const data = JSON.parse(await readFile(global.fileName));
		const account = data.accounts.find(account => account.id === parseInt(req.params.id));
		res.send(account);
		global.logger.info("GET /account/:id")
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const data = JSON.parse(await readFile(global.fileName));
		data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id));
		await writeFile(global.fileName, JSON.stringify(data, null, 2));
		res.end();
		global.logger.info(`DELETE /account/:id - ${req.params.id}`);
	} catch (err) {
		next(err);
	}
});

router.put("/", async (req, res, next) => {
	try {
		const account = req.body;

			//validação dos campos
			if (!account.id || !account.name || account.balance == null) {
				throw new Error("Id, name e balance são obrigatórios!");
			}

		const data = JSON.parse(await readFile(global.fileName));
		const index = data.accounts.findIndex(acc => acc.id === parseInt(account.id));

		//quando o índice passado no body não existe, index retorna -1
		//logo, precisa tratar esse erro
		if (index === -1) {
			throw new Error("Registro não encontrado!");
		}

		data.accounts[index].name = account.name;
		data.accounts[index].balance = account.balance;

		await writeFile(global.fileName, JSON.stringify(data, null, 2));
		res.send(account);
		global.logger.info(`PUT /account - ${JSON.stringify(account)}`);

	} catch (err) {
		next(err);
	}
});

router.patch("/updatebalance", async (req, res, next) => {
	try {
		const account = req.body;
		const data = JSON.parse(await readFile(global.fileName));
		const index = data.accounts.findIndex(acc => acc.id === parseInt(account.id));

		if (!account.id || account.balance == null) {
			throw new Error("Id e Balance são obrigatórios!");
		}

		if (index === -1) {
			throw new Error("Registro não encontrado!");
		}

		data.accounts[index].balance = account.balance;
		await writeFile(global.fileName, JSON.stringify(data, null, 2));
		res.send(data.accounts[index]);
		global.logger.info(`PATCH /account/updatebalance - ${JSON.stringify(account)}`);
	} catch (err) {
		next(err);
	}
});

//Tratamento de erros
router.use((err, req, res, next) => {
	global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
	res.status(400).send({ error: err.message });
})


export default router;
