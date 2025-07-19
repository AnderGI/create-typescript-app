import Route from "./Route"

export default interface RouteValidator {
  validate(route:Route):void;
}