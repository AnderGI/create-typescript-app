import { ContainerBuilder } from 'diod'
import StatusGetController from '../../controllers/status/StatusGetController'

const builder = new ContainerBuilder()
builder.registerAndUse(StatusGetController);

const container = builder.build()

export default container
