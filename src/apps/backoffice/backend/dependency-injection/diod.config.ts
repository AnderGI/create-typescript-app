import { ContainerBuilder } from 'diod';
import StatusGetRouteRegistar from '../routes/status/StatusGetRouteRegistar.js';
import StatusGetController from '../controllers/status/StatusGetController.js';


const builder = new ContainerBuilder()

builder.registerAndUse(StatusGetRouteRegistar).addTag('routeRegistrar')
builder.registerAndUse(StatusGetController)

const container = builder.build();
export default container;
