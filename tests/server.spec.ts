import { test, expect, beforeEach, afterEach } from "bun:test";
import Server from "../lib/server";

let server: Server;
let consoleLog: typeof console.log;
let port: number = 3000 | 3000;

beforeEach(() => {
  port++;
  consoleLog = console.log; // Save original console log
  console.log = () => {}; // Mock the console.log to suppress logs
});

afterEach(() => {
  if (server) {
    server.stop();
    server.router.list;
  }

  // Revert original console log
  console.log = consoleLog;
});

test("server is up and running at port 3000 if not defined manually", async () => {
  // Given
  server = new Server();
  await server.start();

  // When
  const request = await fetch(`http://localhost:3000/`);

  // Then
  expect(request.status).toBe(404);
  expect(request.ok).toBe(false);
  expect(request.url).toEqual(`http://localhost:3000/`);
});

test("server should be stopped if requested", async () => {
  server = new Server();
  await server.start(port);

  server.stop();

  try {
    await fetch(`http://localhost:${port}/`);
    throw new Error("Expected fetch to fail");
  } catch (error) {
    if (error instanceof Error) {
      expect(error.name).toContain("ConnectionRefused");
    } else {
      throw error;
    }
  }
});

test("routes are accessible via server's instance", () => {
  server = new Server();

  expect(server).toHaveProperty("router");
  expect(server.router.list).toBeArray();
});

test("non existing route is returning error 404", async () => {
  server = new Server();
  await server.start(port);

  const request = await fetch(`http://localhost:${port}/non-existing-url`);

  expect(request.status).toBe(404);
});

test("defined route is returning results", async () => {
  server = new Server();
  await server.start(port);
  server.router.define([
    {
      name: "test",
      method: "GET",
      path: "/test",
      handler: () => new Response(),
    },
  ]);

  const request = await fetch(`http://localhost:${port}/test`);

  expect(request.status).toBe(200);
});
