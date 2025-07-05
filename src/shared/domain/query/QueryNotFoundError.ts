import Query  from './Query';
import Response from './Response';
import  QueryHandler from './QueryHandler';

export default class QueryNotFoundError extends Error {
  constructor(handler: QueryHandler<Query, Response>) {
    super(`The query hasn't been found in the handlers <${handler.constructor.name}> suscribedTo method`);
  }
}
