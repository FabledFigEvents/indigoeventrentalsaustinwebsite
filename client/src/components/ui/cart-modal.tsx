import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCartHelpers } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'wouter';

export function CartModal() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
  } = useCartHelpers();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const deliveryFee = 50;
  const setupFee = 75;
  const damageWaiverFee = 25;
  const total = subtotal + deliveryFee + setupFee + damageWaiverFee;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeCart}>
      <Card
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="cart-modal"
      >
        <CardHeader className="border-b border-border">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-serif font-bold">Your Event Quote</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeCart}
              data-testid="close-cart-button"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-muted-foreground">Build your perfect event package</p>
        </CardHeader>

        <CardContent className="p-6">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-8" data-testid="empty-cart">
              <i className="fas fa-shopping-bag text-4xl mb-4"></i>
              <p>Your quote is empty</p>
              <p className="text-sm">Add items from our collections to get started</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6" data-testid="cart-items">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.product.price} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        data-testid={`decrease-quantity-${item.product.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center" data-testid={`quantity-${item.product.id}`}>
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        data-testid={`increase-quantity-${item.product.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        data-testid={`remove-item-${item.product.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-medium" data-testid={`item-total-${item.product.id}`}>
                        ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3" data-testid="quote-summary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span data-testid="subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span data-testid="delivery-fee">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Setup Service</span>
                  <span data-testid="setup-fee">${setupFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Damage Waiver (Optional)</span>
                  <span data-testid="damage-waiver-fee">${damageWaiverFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Estimate</span>
                  <span data-testid="total">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/contact">
                <a className="w-full block mt-6">
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="request-quote-button"
                    onClick={closeCart}
                  >
                    Request Detailed Quote
                  </Button>
                </a>
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
