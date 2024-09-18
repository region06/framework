interface IRoute {
  name: string;
  path: string;
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "HEAD"
    | "OPTIONS"
    | "CONNECT"
    | "TRACE";
  handler: (req?: Request) => Promise<Response> | Response;
}

class Router {
  public list: IRoute[];

  constructor() {
    this.list = [];
  }

  public define(list: IRoute[]) {
    this.list = list;
  }
}

export default Router;
