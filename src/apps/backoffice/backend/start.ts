import { dirname, join } from "path";
import { fileURLToPath } from "url";
import BackofficeBackendApp from "./BackofficeBackendApp.js";
import container from "./dependency-injection/di.js";

try {

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	const configPath = join(__dirname, 'dependency-injection', 'config.ndjson');

	await container.load(configPath)
	const app = new BackofficeBackendApp()
	app.start();
} catch (e) {
	console.log(e);
	process.exit(1);
}

process.on('uncaughtException', err => {
	console.log('uncaughtException', err);
	process.exit(1);
});
