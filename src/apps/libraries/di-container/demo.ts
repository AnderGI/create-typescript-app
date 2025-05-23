import { createReadStream } from "fs";
import {resolve} from "path";
import JsonSchemaValidator from "./JsonSchemaValidator.js";
const containerPath = resolve(import.meta.dirname, 'container.ndjson');
const stream = createReadStream(containerPath)
type Newable<T> = new (...args) => T;

const LINUX_LINE_BREAK = '\n'.charCodeAt(0);
const MACOS_LINE_BREAK = '\r'.charCodeAt(0);

let temp = '';
const _buffer: string[] = []
const isWindowsLineBreak = (currentByte:number, nextByte:number) => currentByte === MACOS_LINE_BREAK && nextByte === LINUX_LINE_BREAK;
const isMacosOrLinuxLineBreak = (currentByte:number) => currentByte === MACOS_LINE_BREAK || currentByte === LINUX_LINE_BREAK;
interface JsonDependencySchema {
  name: string;
  dependencies: string[];
  classpath: string;
}

stream.on('data', (chunk) => {
  let i = 0;
  while(i < chunk.length) {
    const currentByte = chunk[i]
    const nextByte = chunk[i + 1]

    if (isWindowsLineBreak(
        typeof currentByte === "string" ? parseInt(currentByte) : currentByte, 
        typeof nextByte === "string" ? parseInt(nextByte) : nextByte))
    {
      _buffer.push(temp)
      temp = '';
      i++;
    }
    else if (isMacosOrLinuxLineBreak( typeof currentByte === "string" ? parseInt(currentByte) : currentByte)) {
      _buffer.push(temp)
      temp = '';
    }
    else {
      temp += String.fromCharCode(typeof currentByte === "string" ? parseInt(currentByte) : currentByte)
    }

    i++;
  }

})


stream.on('end', () => {  
  if (temp) _buffer.push(temp); 
  const data: JsonDependencySchema[] = JsonSchemaValidator.validate(_buffer.map(b => JSON.parse(b)))
  
  
  const DAG = new Map<string, JsonDependencySchema>();
  for(const x of data) {
    if(!(DAG.has(x.name))) {
      DAG[x.name] = x
    }
  }

  const oficilaDAG = new Map<string, Newable<JsonDependencySchema>>()
  const instancesLIst = Object.values(DAG);
  for(const y of instancesLIst) {
    //console.log(y)
    rec(y)
  }
  
  function rec(data: JsonDependencySchema){
    if(data.dependencies.length > 0) {
      for(const y of data.dependencies){
        rec(DAG[y])
      }
    }
  
    import(data.classpath).then(d => {
      const defaultModule = d.default
      if(!(oficilaDAG.has(data.name))) {
        oficilaDAG[data.name] = new defaultModule() 
      }
      console.log(oficilaDAG)
    }).catch(err => console.error(err))
    
    
  }

})
