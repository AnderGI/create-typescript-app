import Query from "../../domain/query/Query";
import QueryBus from "../../domain/query/QueryBus";
import Response from "../../domain/query/Response";
import QueryHandlers from "./QueryHandlers";

export default class InMemoryAsyncQueryBus implements QueryBus{
  constructor (private queryHandlers: QueryHandlers){}
  
  async ask<Q extends Query, R extends Response>(query: Q): Promise<R> {
    const queryHandler = this.queryHandlers.get(query);

    return await queryHandler.handle(query) as Promise<R>
  }
}