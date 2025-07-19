import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import path from 'path';
import { fileURLToPath } from 'url';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
// const env = process.env.NODE_ENV || 'dev';
const __filename = fileURLToPath(import.meta.url);
console.log(__filename)
const __dirname = path.dirname(__filename)

// Define config path correctly
const configFile = path.resolve(__dirname, 'application_dev.yaml');

console.log(configFile)
loader.load(configFile);

export default container;