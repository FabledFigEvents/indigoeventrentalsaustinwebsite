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
      <section className="pt-20 pb-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold mb-6">The Atelier</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every piece handpicked for its ability to transform spaces into unforgettable experiences
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-2 rounded-full"
                data-testid={`category-filter-${category}`}
              >
                {getCategoryLabel(category)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pt-8 pb-20">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid={`${category}-products-grid`}>
                      {categoryProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          data-testid={`product-card-${product.id}`}
                        >
                          {/* Image Section */}
                          <div className="relative h-48 bg-gray-100">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            {product.vibe && product.vibe.length > 0 && (
                              <div className="absolute top-2 left-2">
                                <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                                  {product.vibe[0].charAt(0).toUpperCase() + product.vibe[0].slice(1)}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Content Section */}
                          <div className="p-4">
                            {/* Product Info */}
                            <div className="mb-3">
                              <h3 className="font-serif text-lg font-semibold text-gray-900 leading-tight mb-1">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                            
                            {/* Price */}
                            <div className="mb-4">
                              <span className="text-lg font-semibold text-primary" data-testid={`price-${product.id}`}>
                                ${product.price} each
                              </span>
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="mb-3">
                              <div className="flex items-center justify-center border border-gray-300 rounded w-28 mx-auto">
                                <button
                                  className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-100"
                                  onClick={() => updateQuantity(product.id, getQuantity(product.id) - 1)}
                                  data-testid={`decrease-quantity-${product.id}`}
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={getQuantity(product.id)}
                                  onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                                  className="w-12 h-8 text-center text-sm font-medium border-0 bg-transparent focus:outline-none"
                                  data-testid={`quantity-input-${product.id}`}
                                />
                                <button
                                  className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-100"
                                  onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                                  data-testid={`increase-quantity-${product.id}`}
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            
                            {/* Add to Cart Button */}
                            <button
                              className="w-full bg-primary text-white py-2 px-4 rounded font-medium hover:bg-primary/90 transition-colors"
                              onClick={() => addToCart(product)}
                              data-testid={`add-to-cart-${product.id}`}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Single category view */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="products-grid">
              {displayProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  data-testid={`product-card-${product.id}`}
                >
                  {/* Image Section */}
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.vibe && product.vibe.length > 0 && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {product.vibe[0].charAt(0).toUpperCase() + product.vibe[0].slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-4">
                    {/* Product Info */}
                    <div className="mb-3">
                      <h3 className="font-serif text-lg font-semibold text-gray-900 leading-tight mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    
                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-lg font-semibold text-primary" data-testid={`price-${product.id}`}>
                        ${product.price} each
                      </span>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="mb-3">
                      <div className="flex items-center justify-center border border-gray-300 rounded w-28 mx-auto">
                        <button
                          className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-100"
                          onClick={() => updateQuantity(product.id, getQuantity(product.id) - 1)}
                          data-testid={`decrease-quantity-${product.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={getQuantity(product.id)}
                          onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                          className="w-12 h-8 text-center text-sm font-medium border-0 bg-transparent focus:outline-none"
                          data-testid={`quantity-input-${product.id}`}
                        />
                        <button
                          className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-100"
                          onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                          data-testid={`increase-quantity-${product.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button
                      className="w-full bg-primary text-white py-2 px-4 rounded font-medium hover:bg-primary/90 transition-colors"
                      onClick={() => addToCart(product)}
                      data-testid={`add-to-cart-${product.id}`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
