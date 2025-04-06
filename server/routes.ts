import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // No API routes needed as the frontend directly calls the webhook

  const httpServer = createServer(app);
  return httpServer;
}
