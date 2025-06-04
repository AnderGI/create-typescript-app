import { createReadStream } from "fs";
import type { Newable } from "../Newable.js";
import { createInterface } from "readline";

interface MapKey  {
  name:string;
  dependencies: string[];
  path: string;
  label?: string;
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

public async load(pathToNDConfigFile: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(pathToNDConfigFile, { encoding: "utf-8" });
    const readLine = createInterface(readStream);

    readLine.on("line", (line: string) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      try {
        const dependency = JSON.parse(trimmed) as MapKey;
        this.add(dependency);

        if (dependency.label) {
          this.addLabel(dependency.label, dependency.name);
        }
      } catch (err) {
        readLine.close(); // Cierra el stream para evitar seguir leyendo
        reject(new Error(`Error parsing line: ${line}\n${(err as Error).message}`));
      }
    });

    readLine.on("close", () => {
      resolve();
    });

    readLine.on("error", (err) => {
      reject(new Error(`Error reading config file: ${(err as Error).message}`));
    });
  });
}



}


const container = new DIContainer();

export default container;