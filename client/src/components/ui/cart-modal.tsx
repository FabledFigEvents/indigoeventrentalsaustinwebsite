import { X, Minus, Plus, Trash2, Users, MapPin } from 'lucide-react';
import { useCartHelpers } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';
import { Link } from 'wouter';

export function CartModal() {
  const {
    items,
    isOpen,
    guestCount,
    location,
    includeDamageWaiver,
    closeCart,
    updateQuantity,
    removeItem,
    setGuestCount,
    setLocation,
    setDamageWaiver,
    getSubtotal,
    calculateDeliveryFee,
    calculateSetupFee,
    getQuoteTotal,
    addItem,
  } = useCartHelpers();

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const deliveryFee = calculateDeliveryFee();
  const setupFee = calculateSetupFee();
  const damageWaiverFee = includeDamageWaiver ? 25 : 0;
  const total = getQuoteTotal();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeCart}>
      <Card
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="cart-modal"
      >
        <CardHeader className="border-b border-border">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-serif font-bold">Your Event Cart</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeCart}
              data-testid="close-cart-button"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-muted-foreground">Build your perfect event package with smart recommendations</p>
        </CardHeader>

        <CardContent className="p-6">
          {/* Event Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="guest-count" className="flex items-center mb-2">
                <Users className="h-4 w-4 mr-2" />
                Expected Guest Count
              </Label>
              <Input
                id="guest-count"
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
                min="1"
                max="1000"
                className="w-full"
                data-testid="guest-count-input"
              />
            </div>
            <div>
              <Label htmlFor="location" className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                Event Location
              </Label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter event location (e.g., Austin, TX)"
                className="w-full"
                data-testid="location-input"
              />
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-8" data-testid="empty-cart">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your quote is empty</h3>
              <p className="text-sm">Add items from our collections to get started building your event</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6" data-testid="cart-items">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.product.name}</h4>
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

              {/* Quote Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3" data-testid="quote-summary">
                  <h4 className="font-semibold mb-3">Quote Summary</h4>
                  <div className="flex justify-between">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span data-testid="subtotal">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span data-testid="delivery-fee" className="flex items-center">
                      ${deliveryFee.toFixed(2)}
                      {!location.toLowerCase().includes('austin') && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          +$25 outside Austin
                        </Badge>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Setup Service</span>
                    <span data-testid="setup-fee" className="flex items-center">
                      ${setupFee.toFixed(2)}
                      {items.length > 10 && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Large event
                        </Badge>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="damage-waiver"
                        checked={includeDamageWaiver}
                        onCheckedChange={setDamageWaiver}
                        data-testid="damage-waiver-checkbox"
                      />
                      <Label htmlFor="damage-waiver" className="text-sm cursor-pointer">
                        Damage Waiver (Optional)
                      </Label>
                    </div>
                    <span data-testid="damage-waiver-fee" className={includeDamageWaiver ? "" : "text-muted-foreground"}>
                      ${damageWaiverFee.toFixed(2)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Estimate</span>
                    <span data-testid="total">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Event Details</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guests:</span>
                      <span className="font-medium">{guestCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{location || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/contact" className="flex-1">
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="request-quote-button"
                    onClick={closeCart}
                  >
                    Request Detailed Quote
                  </Button>
                </Link>
                <Link href="/catalog" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full"
                    data-testid="browse-more-button"
                    onClick={closeCart}
                  >
                    Browse More Items
                  </Button>
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
