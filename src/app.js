import express from "express";

export function createApp() {
  const app = express();

  app.get("/", (req, res) => {
    res.json({ app: "mi-app", version: process.env.APP_VERSION ?? "dev" });
  });

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  return app;
}