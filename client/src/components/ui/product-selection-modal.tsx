import { useState } from "react";
import { X, Plus, Minus, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartHelpers } from "@/lib/cart-context";
import type { Product, LookbookItem, Collection } from "@shared/schema";

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  lookbookItem?: LookbookItem | null;
  collection?: Collection | null;
  products: Product[];
  guestCount?: number;
  showGuestCountInput?: boolean;
}

export function ProductSelectionModal({ 
  isOpen, 
  onClose, 
  title,
  description,
  lookbookItem, 
  collection,
  products, 
  guestCount: initialGuestCount = 50,
  showGuestCountInput = false
}: ProductSelectionModalProps) {
  const { addItem, openCart } = useCartHelpers();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [guestCount, setGuestCount] = useState(initialGuestCount);

  if (!isOpen || (!lookbookItem && !collection)) return null;

  // Get products that are part of this lookbook item or collection
  const relevantProducts = lookbookItem 
    ? products.filter(p => lookbookItem.products?.includes(p.id))
    : collection
    ? products.filter(p => collection.products?.includes(p.id))
    : [];

  // Calculate suggested quantities based on guest count
  const getSuggestedQuantity = (productId: string): number => {
    if (!showGuestCountInput || !collection) {
      return quantities[productId] || 1;
    }

    // For collections, use a base quantity calculation based on guest count
    // Different product types have different scaling factors
    const getBaseQuantityForProduct = (productId: string): number => {
      const product = products.find(p => p.id === productId);
      if (!product) return 1;
      
      // Base quantities for different categories (assuming 50 guests)
      const categoryQuantities: Record<string, number> = {
        'seating': Math.ceil(guestCount / 8), // Tables of 8
        'tables': Math.ceil(guestCount / 8), // Tables of 8
        'lighting': Math.ceil(guestCount / 25), // 1 per 25 guests
        'linens': Math.ceil(guestCount / 8), // 1 per table
        'decor': Math.ceil(guestCount / 15), // Accent pieces
        'lounge': Math.ceil(guestCount / 20), // Lounge areas
      };
      
      return categoryQuantities[product.category] || 1;
    };
    
    const baseQuantity = getBaseQuantityForProduct(productId);
    const suggestedQty = Math.max(1, baseQuantity);
    
    return quantities[productId] !== undefined ? quantities[productId] : suggestedQty;
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const addToCart = (product: Product) => {
    const quantity = getSuggestedQuantity(product.id);
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const viewCart = () => {
    onClose();
    openCart();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <Card
        className="bg-card text-card-foreground max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
            data-testid="close-modal-button"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="font-serif text-2xl pr-12">
            {title}
          </CardTitle>
          {description && (
            <p className="text-muted-foreground">
              {description}
            </p>
          )}
          
          {/* Guest Count Input */}
          {showGuestCountInput && (
            <div className="flex items-center space-x-4 pt-4 border-t border-border">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Expected guests:</span>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => {
                  const newCount = Math.max(1, parseInt(e.target.value) || 1);
                  setGuestCount(newCount);
                  // Reset quantities when guest count changes
                  setQuantities({});
                }}
                min="1"
                max="500"
                className="w-20 px-2 py-1 border border-border rounded text-center"
                data-testid="modal-guest-count-input"
              />
              <span className="text-xs text-muted-foreground">
                Quantities will adjust automatically
              </span>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          {/* Products Grid */}
          <div className="space-y-6">
            {relevantProducts.map((product) => {
              const currentQuantity = getSuggestedQuantity(product.id);
              
              return (
                <div key={product.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full sm:w-24 h-24 object-cover rounded-md"
                      data-testid={`product-image-${product.id}`}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-lg" data-testid={`product-name-${product.id}`}>
                      {product.name}
                    </h4>
                    <p className="text-muted-foreground text-sm" data-testid={`product-description-${product.id}`}>
                      {product.description}
                    </p>
                    <p className="text-lg font-semibold" data-testid={`product-price-${product.id}`}>
                      ${product.price}
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, currentQuantity - 1)}
                        disabled={currentQuantity <= 0}
                        data-testid={`decrease-quantity-${product.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <input
                        type="number"
                        value={currentQuantity}
                        onChange={(e) => updateQuantity(product.id, Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-16 px-2 py-1 border border-border rounded text-center"
                        min="0"
                        data-testid={`quantity-input-${product.id}`}
                      />
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, currentQuantity + 1)}
                        data-testid={`increase-quantity-${product.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={currentQuantity === 0}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      data-testid={`add-to-cart-${product.id}`}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-border">
            <Button
              onClick={viewCart}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="view-cart-button"
            >
              View Cart
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-testid="continue-browsing-button"
            >
              Continue Browsing
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
