import ValueObject from "./ValueObject";

export default abstract class StringValueObject extends ValueObject<string> {
  constructor (readonly value:string){
    super(value)
  }
}