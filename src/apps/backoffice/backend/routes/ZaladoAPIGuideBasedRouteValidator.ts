import Route from "./Route";
import RouteValidator from "./RouteValidator"

export default class ZaladoAPIGuideBasedRouteValidator implements RouteValidator{
  // eslint-disable-next-line no-useless-escape
  private readonly ZALANDO_API_GUIDE_BASED_ROUTE_REGEX = new RegExp('^\/(?:(?:[a-z][a-z0-9-]*|\{[A-Za-z0-9_]+\}))(?:\/(?:[a-z][a-z0-9-]*|\{[A-Za-z0-9_]+\}))*$');

  public validate(route: Route): void {
    // Ensures the route follows Zalando's RESTful API Guidelines.
    //
    // Valid routes must:
    // - Start with `/`
    // - Use kebab-case for static segments (e.g., /users, /order-items)
    // - Use `{param}` format for path variables (alphanumeric + underscores)
    // - Have no empty segments, no trailing slash, no uppercase letters
    //
    // Example: /orders/{orderId}
    // Invalid: /Users, /users//edit, /users/{}
      if(!this.isValid(route.value)) {
        throw new Error('Invalid Route Pattern. Routes must have the following pattern: /path or /path/{param}, kebab-case segments only.');
      }  
  }
  
  public isValid(pathName:string) {
      return this.ZALANDO_API_GUIDE_BASED_ROUTE_REGEX.test(pathName);
  }
}