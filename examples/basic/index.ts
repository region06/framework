import framework06 from "../../";

const server = new framework06();

// define routes
server.router.define([
  {
    name: "homepage",
    method: "GET",
    path: "/",
    handler: (req) => {
      return new Response("homepage");
    },
  },
]);

// start server
server.start(4000);
