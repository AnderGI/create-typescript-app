export type Primitives = string | number | boolean | Date;

export default abstract class ValueObject<T extends Primitives> {
  constructor (readonly value:T){
    this.ensureValueIsDefined(value)
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new Error('Value must be defined');
    }
  }

  equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}