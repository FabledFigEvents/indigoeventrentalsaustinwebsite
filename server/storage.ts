import { type User, type InsertUser, type Product, type Collection, type LookbookItem, type QuoteRequest, type InsertQuoteRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsByVibe(vibe: string): Promise<Product[]>;
  getCollections(): Promise<Collection[]>;
  getCollectionById(id: string): Promise<Collection | undefined>;
  getLookbookItems(): Promise<LookbookItem[]>;
  getLookbookItemsByCategory(category: string): Promise<LookbookItem[]>;
  createQuoteRequest(quote: InsertQuoteRequest): Promise<QuoteRequest>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private collections: Map<string, Collection>;
  private lookbookItems: Map<string, LookbookItem>;
  private quoteRequests: Map<string, QuoteRequest>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.collections = new Map();
    this.lookbookItems = new Map();
    this.quoteRequests = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed Products
    const products = [
      {
        id: "velvet-chair",
        name: "The Velvet Statement",
        description: "Luxurious comfort meets dramatic presence — perfect for intimate dinners and grand celebrations alike",
        price: "8.00",
        category: "seating",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Rich velvet upholstery in deep jewel tones",
        vibe: ["luxe", "romantic", "chic"]
      },
      {
        id: "harvest-table",
        name: "The Harvest Table",
        description: "Organic warmth and natural character — brings authentic charm to any gathering",
        price: "35.00",
        category: "tables",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Reclaimed wood with natural grain patterns",
        vibe: ["romantic", "playful", "chic"]
      },
      {
        id: "aurora-pendant",
        name: "The Aurora Pendant",
        description: "Contemporary elegance with ethereal illumination — creates magical ambient lighting",
        price: "45.00",
        category: "lighting",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Modern glass pendant with adjustable height",
        vibe: ["chic", "professional", "luxe"]
      },
      {
        id: "silk-runner",
        name: "The Silk Whisper",
        description: "Flowing elegance in lustrous champagne — adds refined luxury to any tablescape",
        price: "12.00",
        category: "linens",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Pure silk with subtle sheen and drape",
        vibe: ["luxe", "romantic", "chic"]
      },
      {
        id: "modern-lounge",
        name: "The Metropolitan Lounge",
        description: "Clean lines and contemporary comfort for sophisticated social spaces",
        price: "75.00",
        category: "seating",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Sleek leather with chrome accents",
        vibe: ["professional", "chic", "luxe"]
      },
      {
        id: "crystal-chandelier",
        name: "The Opulent Crown",
        description: "Timeless grandeur with cascading crystal drama for truly memorable occasions",
        price: "125.00",
        category: "lighting",
        imageUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Multi-tiered crystal with gold fixtures",
        vibe: ["luxe", "romantic"]
      }
    ];

    products.forEach(product => {
      this.products.set(product.id, product as Product);
    });

    // Seed Collections
    const collections = [
      {
        id: "midnight-luxe",
        name: "The Midnight Luxe",
        description: "Dramatic elegance with deep tones and golden accents for unforgettable evenings",
        imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        products: ["velvet-chair", "crystal-chandelier", "silk-runner"],
        vibe: "luxe",
        isSeasonalLookbook: true
      },
      {
        id: "garden-gala",
        name: "The Garden Gala",
        description: "Organic romance with natural textures and botanical inspired elements",
        imageUrl: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        products: ["harvest-table", "velvet-chair"],
        vibe: "romantic",
        isSeasonalLookbook: true
      },
      {
        id: "modern-minimalist",
        name: "The Modern Minimalist",
        description: "Clean lines and sophisticated simplicity for contemporary celebrations",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        products: ["modern-lounge", "aurora-pendant"],
        vibe: "professional",
        isSeasonalLookbook: true
      }
    ];

    collections.forEach(collection => {
      this.collections.set(collection.id, collection as Collection);
    });

    // Seed Lookbook Items
    const lookbookItems = [
      {
        id: "garden-romance",
        title: "Garden Romance",
        imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        category: "wedding",
        products: ["harvest-table", "velvet-chair"],
        description: "Romantic outdoor wedding with natural elements"
      },
      {
        id: "executive-edge",
        title: "Executive Edge",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        category: "corporate",
        products: ["modern-lounge", "aurora-pendant"],
        description: "Sophisticated corporate event with modern styling"
      },
      {
        id: "golden-gala",
        title: "Golden Hour Gala",
        imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        category: "luxe",
        products: ["crystal-chandelier", "silk-runner", "velvet-chair"],
        description: "Luxurious evening celebration with crystal and gold"
      }
    ];

    lookbookItems.forEach(item => {
      this.lookbookItems.set(item.id, item as LookbookItem);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getProductsByVibe(vibe: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => 
      product.vibe?.includes(vibe)
    );
  }

  async getCollections(): Promise<Collection[]> {
    return Array.from(this.collections.values());
  }

  async getCollectionById(id: string): Promise<Collection | undefined> {
    return this.collections.get(id);
  }

  async getLookbookItems(): Promise<LookbookItem[]> {
    return Array.from(this.lookbookItems.values());
  }

  async getLookbookItemsByCategory(category: string): Promise<LookbookItem[]> {
    return Array.from(this.lookbookItems.values()).filter(item => item.category === category);
  }

  async createQuoteRequest(insertQuote: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = randomUUID();
    const subtotal = "250.00";
    const deliveryFee = "50.00";
    const setupFee = "75.00";
    const damageWaiverFee = "25.00";
    const total = "400.00";
    
    const quote: QuoteRequest = { 
      ...insertQuote, 
      id,
      subtotal,
      deliveryFee,
      setupFee,
      damageWaiverFee,
      total
    };
    this.quoteRequests.set(id, quote);
    return quote;
  }
}

export const storage = new MemStorage();
