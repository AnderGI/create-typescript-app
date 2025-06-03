import type { Newable } from "../Newable.js";
import type Router from "../routes/Router.js";

interface MapKey  {
  name:string;
  dependencies: string[];
  path: string;
}


class DIContainer {
  private readonly labeledDependencies = new Map<string, string[]>()
  private readonly dependencies = new Map<string, MapKey>()

  public async add(value:MapKey) {
    this.dependencies.set(value.name, value)
    return this;
  }

  public addLabel(toAddLabel:string, valeString:string){
    const label = this.labeledDependencies.get(toAddLabel);

    if(!label){
      this.labeledDependencies.set(toAddLabel, [valeString])
      return;
    }

    label.push(valeString);
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async findByLabel(label: string): Promise<Newable<any>[]> {
    const names = this.labeledDependencies.get(label);
    if (!names || names.length === 0) {
      throw new Error(`No dependencies found with label "${label}"`);
    }

    const instances = await Promise.all(
      names.map(name => this.get(name))
    );

    return instances;
}


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async get(name:string):Promise<Newable<any>> {
    const dependency = this.dependencies.get(name)
    
    if(!dependency) throw new Error(`No dependency for for ${name}`);

    const dependencyList = dependency.dependencies.length === 0 ? [] : await Promise.all(dependency.dependencies.map(_ => this.get(_)));
    const module = await import(dependency.path);

    // TODO default should be compulsory?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Class = module.default as Newable<any>; 
    
    return new Class(...dependencyList)  
  }
}


// Add depenedencies here below
const container = new DIContainer();

container.add({
  name: 'http-server',
  dependencies: ['router'],
  path: './../HttpServer.js'
})

container.add({
  name: 'backoffice-backend-app',
  dependencies: ['http-server'],
  path: './../BackofficeBackendApp.js'
})

container.add({
  name: 'router',
  dependencies: [],
  path: './../routes/Router.js'
})

container.add({
  name: 'status-get-route',
  dependencies: [],
  path: './../routes/status/StatusGetRouteHandler.js'
})

container.addLabel('routeRegistrar', 'status-get-route')

container.get('router').then(async router => {
  await (router as unknown as Router).init();
  console.log(router);
});



export default container;