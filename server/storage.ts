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
    // Seed Products - Comprehensive Event Rental Catalog
    const products = [
      // CHAIRS & SEATING
      {
        id: "chiavari-chair-gold",
        name: "Gold Chiavari Chair",
        description: "Classic elegant chair perfect for weddings and formal events",
        price: "4.50",
        category: "seating",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Lightweight with gold finish and ivory cushion",
        vibe: ["luxe", "romantic", "chic"]
      },
      {
        id: "chiavari-chair-silver",
        name: "Silver Chiavari Chair",
        description: "Sophisticated silver chair ideal for modern celebrations",
        price: "4.50",
        category: "seating",
        imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Polished silver finish with plush seating",
        vibe: ["chic", "professional", "luxe"]
      },
      {
        id: "ghost-chair-clear",
        name: "Clear Ghost Chair",
        description: "Modern transparent chair that complements any decor style",
        price: "6.00",
        category: "seating",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Clear acrylic with contemporary styling",
        vibe: ["chic", "professional", "playful"]
      },
      {
        id: "rustic-wood-chair",
        name: "Rustic Wood Farm Chair",
        description: "Charming wooden chair perfect for outdoor and barn venues",
        price: "5.50",
        category: "seating",
        imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Natural wood with weathered finish",
        vibe: ["romantic", "playful"]
      },
      {
        id: "velvet-lounge-chair",
        name: "Velvet Cocktail Lounge Chair",
        description: "Luxurious velvet chair ideal for cocktail hours and VIP areas",
        price: "15.00",
        category: "seating",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Deep navy velvet with brass legs",
        vibe: ["luxe", "chic"]
      },
      
      // TABLES
      {
        id: "round-table-60",
        name: "60\" Round Reception Table",
        description: "Classic round table seating 8-10 guests comfortably",
        price: "25.00",
        category: "tables",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "White laminate top with sturdy base",
        vibe: ["professional", "chic"]
      },
      {
        id: "round-table-72",
        name: "72\" Round Reception Table",
        description: "Spacious round table perfect for larger guest groups",
        price: "30.00",
        category: "tables",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Seats 10-12 guests with room for centerpieces",
        vibe: ["professional", "romantic"]
      },
      {
        id: "farm-table-8ft",
        name: "8ft Rustic Farm Table",
        description: "Beautiful wooden farm table for family-style dining",
        price: "45.00",
        category: "tables",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Reclaimed wood with natural grain and character",
        vibe: ["romantic", "playful"]
      },
      {
        id: "cocktail-table-highboy",
        name: "Cocktail Highboy Table",
        description: "Standing height table perfect for cocktail receptions",
        price: "18.00",
        category: "tables",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "30\" round top at 42\" height",
        vibe: ["chic", "professional"]
      },
      {
        id: "sweetheart-table",
        name: "Sweetheart Table for Two",
        description: "Intimate table designed for the happy couple",
        price: "35.00",
        category: "tables",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Elegant styling with optional decorative base",
        vibe: ["romantic", "luxe"]
      },
      
      // LINENS
      {
        id: "white-satin-tablecloth",
        name: "White Satin Tablecloth",
        description: "Classic white satin tablecloth for elegant dining",
        price: "12.00",
        category: "linens",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Premium satin with subtle sheen",
        vibe: ["romantic", "chic", "luxe"]
      },
      {
        id: "burlap-table-runner",
        name: "Burlap Table Runner",
        description: "Rustic burlap runner perfect for farm and outdoor themes",
        price: "8.00",
        category: "linens",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Natural jute with frayed edges",
        vibe: ["playful", "romantic"]
      },
      {
        id: "sequin-table-runner",
        name: "Gold Sequin Table Runner",
        description: "Glamorous sequin runner that adds sparkle to any table",
        price: "15.00",
        category: "linens",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Hand-sewn sequins with satin backing",
        vibe: ["luxe", "chic"]
      },
      {
        id: "navy-linen-tablecloth",
        name: "Navy Blue Linen Tablecloth",
        description: "Sophisticated navy linen for upscale events",
        price: "16.00",
        category: "linens",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "100% linen with natural texture",
        vibe: ["professional", "chic", "luxe"]
      },
      {
        id: "blush-napkin-set",
        name: "Blush Pink Napkin Set",
        description: "Soft pink napkins perfect for romantic celebrations",
        price: "2.50",
        category: "linens",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Set of 10 cotton napkins",
        vibe: ["romantic", "playful"]
      },
      
      // TABLE SETTINGS & TABLEWARE
      {
        id: "gold-charger-plates",
        name: "Gold Charger Plates",
        description: "Elegant gold charger plates for formal place settings",
        price: "3.00",
        category: "tableware",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "13\" diameter with metallic finish",
        vibe: ["luxe", "romantic", "chic"]
      },
      {
        id: "vintage-china-set",
        name: "Vintage China Place Setting",
        description: "Beautiful vintage-style china for sophisticated dining",
        price: "8.00",
        category: "tableware",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Includes plate, bowl, and cup with saucer",
        vibe: ["romantic", "chic"]
      },
      {
        id: "crystal-wine-glasses",
        name: "Crystal Wine Glasses",
        description: "Premium crystal wine glasses for elegant toasts",
        price: "4.50",
        category: "tableware",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Lead crystal with elegant stem",
        vibe: ["luxe", "chic"]
      },
      {
        id: "copper-flatware-set",
        name: "Copper Flatware Set",
        description: "Modern copper flatware for trendy place settings",
        price: "5.00",
        category: "tableware",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "5-piece setting with matte copper finish",
        vibe: ["chic", "playful"]
      },
      
      // WEDDING DECORATIONS
      {
        id: "wedding-arch-white",
        name: "White Wedding Ceremony Arch",
        description: "Beautiful white arch perfect for ceremony backdrops",
        price: "125.00",
        category: "decor",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "8ft tall with decorative details",
        vibe: ["romantic", "luxe"]
      },
      {
        id: "flower-wall-backdrop",
        name: "Flower Wall Backdrop",
        description: "Stunning artificial flower wall for photos and ceremonies",
        price: "200.00",
        category: "decor",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "8x8ft with mixed florals in soft tones",
        vibe: ["romantic", "luxe", "chic"]
      },
      {
        id: "vintage-wooden-signs",
        name: "Vintage Wooden Welcome Signs",
        description: "Rustic wooden signs for directing guests and adding charm",
        price: "25.00",
        category: "decor",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Weathered wood with hand-painted text",
        vibe: ["playful", "romantic"]
      },
      {
        id: "crystal-centerpiece",
        name: "Crystal Centerpiece Collection",
        description: "Elegant crystal vases and candle holders for table decor",
        price: "35.00",
        category: "decor",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Mixed heights with LED candles included",
        vibe: ["luxe", "romantic", "chic"]
      },
      
      // LIGHTING
      {
        id: "string-lights-cafe",
        name: "Cafe String Lights",
        description: "Warm white string lights perfect for outdoor ambiance",
        price: "15.00",
        category: "lighting",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "100ft strand with Edison-style bulbs",
        vibe: ["romantic", "playful"]
      },
      {
        id: "crystal-chandelier",
        name: "Crystal Chandelier",
        description: "Stunning crystal chandelier for elegant overhead lighting",
        price: "150.00",
        category: "lighting",
        imageUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Multi-tiered with hundreds of crystals",
        vibe: ["luxe", "romantic", "chic"]
      },
      {
        id: "uplighting-led",
        name: "LED Uplighting Package",
        description: "Professional LED uplights to enhance venue ambiance",
        price: "25.00",
        category: "lighting",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Color-changing LEDs with wireless control",
        vibe: ["chic", "professional"]
      },
      {
        id: "lantern-centerpieces",
        name: "Vintage Lantern Centerpieces",
        description: "Charming lanterns with LED candles for table lighting",
        price: "12.00",
        category: "lighting",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Antique brass finish with flickering LED",
        vibe: ["romantic", "playful"]
      },
      
      // SPEAKERS & AUDIO
      {
        id: "wireless-speaker-system",
        name: "Wireless Speaker System",
        description: "Professional wireless speakers for ceremonies and receptions",
        price: "75.00",
        category: "audio",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Includes 2 speakers, mixer, and wireless mics",
        vibe: ["professional", "chic"]
      },
      {
        id: "ceremony-sound-package",
        name: "Ceremony Sound Package",
        description: "Complete audio setup for wedding ceremonies",
        price: "125.00",
        category: "audio",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Includes speakers, microphones, and music player",
        vibe: ["professional", "romantic"]
      },
      
      // DANCE FLOORS
      {
        id: "white-dance-floor",
        name: "White Dance Floor",
        description: "Classic white dance floor perfect for any celebration",
        price: "300.00",
        category: "flooring",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "16x16ft seamless white vinyl surface",
        vibe: ["chic", "luxe", "professional"]
      },
      {
        id: "rustic-wood-dance-floor",
        name: "Rustic Wood Dance Floor",
        description: "Beautiful wooden dance floor for barn and outdoor venues",
        price: "350.00",
        category: "flooring",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Reclaimed wood planks with natural finish",
        vibe: ["romantic", "playful"]
      },
      
      // PHOTO BOOTHS & ENTERTAINMENT
      {
        id: "vintage-photo-booth",
        name: "Vintage Photo Booth",
        description: "Classic photo booth with instant prints for guest memories",
        price: "400.00",
        category: "entertainment",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Includes props, backdrop, and attendant",
        vibe: ["playful", "chic"]
      },
      {
        id: "hashtag-sign-custom",
        name: "Custom Hashtag Sign",
        description: "Personalized hashtag sign to encourage social media sharing",
        price: "45.00",
        category: "entertainment",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        styleNotes: "Acrylic or wood with custom design",
        vibe: ["playful", "chic"]
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
        products: ["velvet-lounge-chair", "crystal-chandelier", "gold-sequin-table-runner", "gold-charger-plates"],
        vibe: "luxe",
        isSeasonalLookbook: true
      },
      {
        id: "garden-gala",
        name: "The Garden Gala",
        description: "Organic romance with natural textures and botanical inspired elements",
        imageUrl: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        products: ["farm-table-8ft", "rustic-wood-chair", "burlap-table-runner", "vintage-wooden-signs"],
        vibe: "romantic",
        isSeasonalLookbook: true
      },
      {
        id: "modern-minimalist",
        name: "The Modern Minimalist",
        description: "Clean lines and sophisticated simplicity for contemporary celebrations",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        products: ["ghost-chair-clear", "round-table-60", "white-satin-tablecloth", "uplighting-led"],
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
        products: ["farm-table-8ft", "rustic-wood-chair", "burlap-table-runner", "string-lights-cafe"],
        description: "Romantic outdoor wedding with natural elements"
      },
      {
        id: "executive-edge",
        title: "Executive Edge",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        category: "corporate",
        products: ["ghost-chair-clear", "round-table-60", "navy-linen-tablecloth", "wireless-speaker-system"],
        description: "Sophisticated corporate event with modern styling"
      },
      {
        id: "golden-gala",
        title: "Golden Hour Gala",
        imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        category: "luxe",
        products: ["crystal-chandelier", "gold-sequin-table-runner", "gold-charger-plates", "velvet-lounge-chair"],
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
