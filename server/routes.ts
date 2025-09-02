import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get products by category
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  // Get products by vibe
  app.get("/api/products/vibe/:vibe", async (req, res) => {
    try {
      const { vibe } = req.params;
      const products = await storage.getProductsByVibe(vibe);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by vibe" });
    }
  });

  // Get all collections
  app.get("/api/collections", async (req, res) => {
    try {
      const collections = await storage.getCollections();
      res.json(collections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collections" });
    }
  });

  // Get collection by ID
  app.get("/api/collections/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const collection = await storage.getCollectionById(id);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collection" });
    }
  });

  // Get all lookbook items
  app.get("/api/lookbook", async (req, res) => {
    try {
      const lookbookItems = await storage.getLookbookItems();
      res.json(lookbookItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lookbook items" });
    }
  });

  // Get lookbook items by category
  app.get("/api/lookbook/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const lookbookItems = await storage.getLookbookItemsByCategory(category);
      res.json(lookbookItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lookbook items by category" });
    }
  });

  // Create quote request
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const quote = await storage.createQuoteRequest(validatedData);
      res.status(201).json(quote);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create quote request" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
