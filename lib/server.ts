import type { Serve } from "bun";

export default class Server {
  private server: any;

  public start() {
    this.server = Bun.serve({
      port: 3000,
      fetch() {
        return new Response("");
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
