import Query from "./Query";
import Response from "./Response";


export default interface QueryBus {
  ask<Q extends Query, R extends Response>(query:Q): Promise<R>
}