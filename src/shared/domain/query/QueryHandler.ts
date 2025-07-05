import Query from "./Query";

export default interface QueryHandler<Q extends Query, R extends Response> {
  subscribedTo(): Query;
  handle(query:Q): Promise<R>;
}