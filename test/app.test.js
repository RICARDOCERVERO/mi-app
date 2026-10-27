import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";

async function conServidor(fn) {
  const server = createApp().listen(0);
  const { port } = server.address();
  try {
    await fn(`http://127.0.0.1:${port}`);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
}

test("GET /health responde ok", async () => {
  await conServidor(async (base) => {
    const res = await fetch(`${base}/health`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { status: "ok" });
  });
});

test("GET / informa de la versión", async () => {
  await conServidor(async (base) => {
    const res = await fetch(`${base}/`);
    const body = await res.json();
    assert.equal(body.app, "mi-app");
    assert.ok(body.version);
  });
});