import BackofficeBackendApp from "./BackofficeBackendApp.js";
import container from "./dependency-injection/di.js";

try {
	const app = await container.get('backoffice-backend-app') as unknown as BackofficeBackendApp
	app.start();
} catch (e) {
	console.log(e);
	process.exit(1);
}

process.on('uncaughtException', err => {
	console.log('uncaughtException', err);
	process.exit(1);
});
