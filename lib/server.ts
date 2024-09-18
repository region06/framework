import type { Server as BunServer } from "bun";
import Router from "./routes";

export default class Server {
  private server: BunServer | undefined;
  public router: Router;

  constructor() {
    this.server = undefined;
    this.router = new Router();
  }

  public async start(port?: number) {
    if (!port) port = 3000;

    const router = this.router;
    this.server = Bun.serve({
      port,
      fetch(request) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        const route = router.list.find(
          (r) => r.path === path && r.method === method
        );

        if (route) {
          return route.handler(request);
        }

        return new Response("Not found", { status: 404 });
      },
    });

    console.log("Server is running at localhost:3000");
    return this.server;
  }

  public stop() {
    if (this.server) {
      this.server.stop();
      console.log("Server stopped");
    }
  }
}
