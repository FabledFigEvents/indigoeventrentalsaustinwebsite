import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Product } from '@shared/schema';
import { useCartHelpers } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Filter, Minus } from 'lucide-react';

export default function Catalog() {
  const { addItem } = useCartHelpers();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: categoryProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products/category', selectedCategory],
    enabled: selectedCategory !== 'all',
  });

  const categories = ['all', 'seating', 'tables', 'linens', 'tableware', 'decor', 'lighting', 'audio', 'flooring'];
  const displayProducts = selectedCategory === 'all' ? products : categoryProducts;

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      all: 'All Pieces',
      seating: 'Seating',
      tables: 'Tables',
      linens: 'Linens',
      tableware: 'Table Settings',
      decor: 'Décor',
      lighting: 'Lighting',
      audio: 'Electronics',
      flooring: 'Dance Floors',
    };
    return labels[category] || category;
  };

  const getProductsByCategory = (products: Product[], category: string) => {
    return products.filter(product => product.category === category);
  };

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

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold mb-6">The Atelier</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every piece handpicked for its ability to transform spaces into unforgettable experiences
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-6 mb-12">
            {/* All Pieces Filter */}
            <div className="flex justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="px-8 py-3 rounded-full text-lg"
                data-testid="category-filter-all"
              >
                <Filter className="h-4 w-4 mr-2" />
                All Pieces
              </Button>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.slice(1).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="px-6 py-2 rounded-full"
                  data-testid={`category-filter-${category}`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {getCategoryLabel(category)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {displayProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found in this category.</p>
            </div>
          ) : selectedCategory === 'all' ? (
            /* Sectioned view for All Pieces */
            <div className="space-y-16">
              {categories.slice(1).map((category) => {
                const categoryProducts = getProductsByCategory(products, category);
                if (categoryProducts.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-8">
                    <div className="text-center">
                      <h2 className="text-3xl font-serif font-bold mb-2">{getCategoryLabel(category)}</h2>
                      <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-testid={`${category}-products-grid`}>
                      {categoryProducts.map((product) => (
                        <Card
                          key={product.id}
                          className="product-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                          data-testid={`product-card-${product.id}`}
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-64 object-cover"
                            />
                            {product.vibe && product.vibe.length > 0 && (
                              <div className="absolute bottom-4 left-4">
                                <Badge variant="secondary" className="bg-black/50 text-white">
                                  {product.vibe[0].charAt(0).toUpperCase() + product.vibe[0].slice(1)}
                                </Badge>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-6">
                            <h3 className="font-serif text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                              {product.description}
                            </p>
                            {product.styleNotes && (
                              <p className="text-xs text-muted-foreground mb-3 italic">
                                {product.styleNotes}
                              </p>
                            )}
                            <div className="flex justify-between items-center mb-4">
                              <span className="font-medium text-lg" data-testid={`price-${product.id}`}>
                                ${product.price} each
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary text-sm font-medium hover:underline"
                                data-testid={`view-details-${product.id}`}
                              >
                                View Details
                              </Button>
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
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
                                  className="h-8 w-12 text-center border-0 text-sm"
                                  data-testid={`quantity-input-${product.id}`}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                                  data-testid={`increase-quantity-${product.id}`}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                size="sm"
                                className="flex-1"
                                onClick={() => addToCart(product)}
                                data-testid={`add-to-cart-${product.id}`}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Single category view */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-testid="products-grid">
              {displayProducts.map((product) => (
                <Card
                  key={product.id}
                  className="product-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  data-testid={`product-card-${product.id}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    {product.vibe && product.vibe.length > 0 && (
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="bg-black/50 text-white">
                          {product.vibe[0].charAt(0).toUpperCase() + product.vibe[0].slice(1)}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    {product.styleNotes && (
                      <p className="text-xs text-muted-foreground mb-3 italic">
                        {product.styleNotes}
                      </p>
                    )}
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium text-lg" data-testid={`price-${product.id}`}>
                        ${product.price} each
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary text-sm font-medium hover:underline"
                        data-testid={`view-details-${product.id}`}
                      >
                        View Details
                      </Button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
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
                          className="h-8 w-12 text-center border-0 text-sm"
                          data-testid={`quantity-input-${product.id}`}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                          data-testid={`increase-quantity-${product.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => addToCart(product)}
                        data-testid={`add-to-cart-${product.id}`}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
