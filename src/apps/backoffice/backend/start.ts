import container  from './dependency-injection/node-dependency-injection/index'

try {
	const app = container.get('Apps.Backoffice.Backend.BackofficeBackendApp')
	await app.start();
  await app.registerRoutes()


} catch (e) {
	console.log(e);
	process.exit(1);
}

process.on('uncaughtException', err => {
	console.log('uncaughtException', err);
	process.exit(1);
});

