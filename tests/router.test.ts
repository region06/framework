import { expect, it } from "bun:test";
import Routes from "../lib/routes";

it("should be able to define routes", () => {
  // Given
  const routes = new Routes();

  // When
  routes.define([
    {
      name: "test.route1",
      method: "GET",
      path: "/route1",
      handler: () => {
        return new Response("route1");
      },
    },
    {
      name: "test.route2",
      method: "GET",
      path: "/route2",
      handler: () => {
        return new Response("route2");
      },
    },
  ]);

  // Then
  expect(routes.list[0].name).toBe("test.route1");
  expect(routes.list[1].name).toBe("test.route2");
  expect(routes.list.length).toBe(2);
});

it("should handle route action in json format", async () => {
  // Given
  const routes = new Routes();
  routes.define([
    {
      name: "test",
      method: "GET",
      path: "/test",
      handler: () => {
        return Response.json({ message: "tested" });
      },
    },
  ]);

  // When
  const action = await routes.list[0].handler();

  // Then
  expect(action.status).toBe(200);
  expect(action.headers.toJSON()["content-type"]).toBe(
    "application/json;charset=utf-8"
  );
});
