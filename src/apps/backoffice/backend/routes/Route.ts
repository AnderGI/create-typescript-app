import StringValueObject from "../../../../shared/domain/StringValueObject";

export default class Route extends StringValueObject{
  constructor (readonly value:string){
    super(value)
  }

  public static fromPrimitives(value:string):Route {
    return new Route(value);
  }
}