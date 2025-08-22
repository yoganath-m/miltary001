import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getDashboardMetrics,
  getPurchases,
  createPurchase,
  getTransfers,
  createTransfer,
  getAssignments,
  createAssignment,
} from "./routes/assets";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Asset management routes
  app.get("/api/dashboard", getDashboardMetrics);
  app.get("/api/purchases", getPurchases);
  app.post("/api/purchases", createPurchase);
  app.get("/api/transfers", getTransfers);
  app.post("/api/transfers", createTransfer);
  app.get("/api/assignments", getAssignments);
  app.post("/api/assignments", createAssignment);

  return app;
}
