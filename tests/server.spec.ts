import { test, expect, beforeEach, afterEach } from "bun:test";
import Server from "../lib/server";

let server: Server;
let consoleLog: typeof console.log;

beforeEach(() => {
  consoleLog = console.log; // Save original console log
  console.log = () => {}; // Mock the console.log to suppress logs
});

afterEach(() => {
  if (server) {
    server.stop();
  }

  // Revert original console log
  console.log = consoleLog;
});

test("server is up and running at port 3000", async () => {
  // Given
  server = new Server();
  server.start();

  // When
  const request = await fetch("http://localhost:3000/");

  // Then
  expect(request.status).toBe(200);
  expect(request.ok).toBe(true);
  expect(request.url).toEqual("http://localhost:3000/");
});

test("server should be stopped if requested", async () => {
  server = new Server();
  server.start();

  server.stop();

  try {
    await fetch("http://localhost:3000");
  } catch (error) {
    if (error instanceof Error) {
      expect(error.name).toContain("ConnectionRefused");
    } else {
      throw error;
    }
  }
});
