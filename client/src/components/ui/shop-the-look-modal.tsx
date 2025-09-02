import { X, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useCartHelpers } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LookbookItem, Product } from '@shared/schema';

interface ShopTheLookModalProps {
  isOpen: boolean;
  onClose: () => void;
  lookbookItem: LookbookItem | null;
  products: Product[];
}

export function ShopTheLookModal({ isOpen, onClose, lookbookItem, products }: ShopTheLookModalProps) {
  const { addItem, openCart } = useCartHelpers();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  if (!isOpen || !lookbookItem) return null;

  const lookProducts = products.filter(product => 
    lookbookItem.products?.includes(product.id)
  );

  const getQuantity = (productId: string) => quantities[productId] || 1;

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
    }
  };

  const addToCart = (product: Product) => {
    const quantity = getQuantity(product.id);
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
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="shop-the-look-modal"
      >
        <CardHeader className="border-b border-border">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-serif font-bold">{lookbookItem.title}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              data-testid="close-shop-look-button"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            {lookbookItem.description || 'Add individual pieces from this curated look to your cart'}
          </p>
        </CardHeader>

        <CardContent className="p-6">
          {lookProducts.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p className="text-lg">No products available for this look.</p>
            </div>
          ) : (
            <>
              {/* Products List */}
              <div className="space-y-6 mb-6" data-testid="look-products">
                {lookProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif text-lg font-semibold mb-1">{product.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                      <p className="font-medium text-primary">${product.price} each</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0"
                          onClick={() => updateQuantity(product.id, getQuantity(product.id) - 1)}
                          data-testid={`decrease-quantity-${product.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={getQuantity(product.id)}
                          onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                          className="h-9 w-16 text-center border-0 text-sm"
                          data-testid={`quantity-input-${product.id}`}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0"
                          onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                          data-testid={`increase-quantity-${product.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        onClick={() => addToCart(product)}
                        className="px-6"
                        data-testid={`add-to-cart-${product.id}`}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}