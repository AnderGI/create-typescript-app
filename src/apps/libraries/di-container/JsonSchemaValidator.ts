interface JsonDependencySchema {
  name: string;
  dependencies: string[];
  classpath: string;
}

export default class JsonSchemaValidator {
  
  public static validate(data:JsonDependencySchema[]): JsonDependencySchema[] {
    return data.map(buff => {
      JsonSchemaValidator.validateJsonSchema(buff)
      return buff;
    }) 
  } 
  
  private static validateJsonSchema(schema:JsonDependencySchema) {
    JsonSchemaValidator.ensureIsObject(schema)
    JsonSchemaValidator.ensureIsNameIsString(schema)
    JsonSchemaValidator.ensureArrayIsArrayOfStrings(schema)
    JsonSchemaValidator.ensureClassPathIsAString(schema)
  }
  
  private static ensureIsObject(schema: JsonDependencySchema) {
    const isValid = typeof schema === "object" && schema !== null;
  
    if(!isValid) {
      throw new Error('Schema must be an object type')
      process.exit(1)
    }
  }
  
  private static ensureIsNameIsString(schema: JsonDependencySchema) {
    const isValid =  schema.name !== null && typeof schema.name === "string"
    if(!isValid) {
      throw new Error('Schema must have a key named name as an string')
      process.exit(1)
    }
  }
  
  private static ensureArrayIsArrayOfStrings(schema: JsonDependencySchema) {
    const isValid =  Array.isArray(schema.dependencies) && schema.dependencies.every(dep => typeof dep === "string")
    if(!isValid) {
      throw new Error('Schema must have a key named dependencies as an array of strings')
      process.exit(1)
    }
  }

  private static ensureClassPathIsAString(schema: JsonDependencySchema) {
    const isValid =  schema.classpath !== null && typeof schema.classpath === "string"
    if(!isValid) {
      throw new Error('Schema must have a key named url as an string with a valid url format')
      process.exit(1)
    }   
  }
}