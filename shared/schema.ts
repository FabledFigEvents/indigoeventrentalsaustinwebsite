import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  styleNotes: text("style_notes"),
  vibe: text("vibe").array(),
});

export const collections = pgTable("collections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  products: text("products").array(),
  vibe: text("vibe").notNull(),
  isSeasonalLookbook: boolean("is_seasonal_lookbook").default(true),
});

export const lookbookItems = pgTable("lookbook_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  products: text("products").array(),
  description: text("description"),
});

export const quoteRequests = pgTable("quote_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  eventType: text("event_type").notNull(),
  eventDate: text("event_date").notNull(),
  guestCount: integer("guest_count"),
  location: text("location"),
  message: text("message"),
  items: text("items").array(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }),
  deliveryFee: decimal("delivery_fee", { precision: 10, scale: 2 }),
  setupFee: decimal("setup_fee", { precision: 10, scale: 2 }),
  damageWaiverFee: decimal("damage_waiver_fee", { precision: 10, scale: 2 }),
  total: decimal("total", { precision: 10, scale: 2 }),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
});

export const insertLookbookItemSchema = createInsertSchema(lookbookItems).omit({
  id: true,
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  subtotal: true,
  deliveryFee: true,
  setupFee: true,
  damageWaiverFee: true,
  total: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Collection = typeof collections.$inferSelect;
export type LookbookItem = typeof lookbookItems.$inferSelect;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;
export type InsertLookbookItem = z.infer<typeof insertLookbookItemSchema>;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
