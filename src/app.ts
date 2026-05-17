import express from "express";

import { payload, publishBoard, ruleBoard, sessionBoard, summary } from "./services/previewService";
import {
  renderDocs,
  renderOverview,
  renderPreviewMatrix,
  renderPublishLane,
  renderRecoveryRules,
  renderVerification,
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5206);

app.get("/", (_req, res) => {
  res.type("html").send(renderOverview());
});

app.get("/preview-matrix", (_req, res) => {
  res.type("html").send(renderPreviewMatrix());
});

app.get("/recovery-rules", (_req, res) => {
  res.type("html").send(renderRecoveryRules());
});

app.get("/publish-lane", (_req, res) => {
  res.type("html").send(renderPublishLane());
});

app.get("/verification", (_req, res) => {
  res.type("html").send(renderVerification());
});

app.get("/docs", (_req, res) => {
  res.type("html").send(renderDocs());
});

app.get("/api/dashboard/summary", (_req, res) => {
  res.json(summary());
});

app.get("/api/sessions", (_req, res) => {
  res.json(sessionBoard());
});

app.get("/api/rules", (_req, res) => {
  res.json(ruleBoard());
});

app.get("/api/publish-lanes", (_req, res) => {
  res.json(publishBoard());
});

app.get("/api/sample", (_req, res) => {
  res.json(payload());
});

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Headless Preview Recovery Kit listening on http://127.0.0.1:${port}`);
  });
}

export default app;
