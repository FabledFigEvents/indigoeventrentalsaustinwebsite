import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { LookbookItem, Product } from '@shared/schema';
import { useCartHelpers } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductSelectionModal } from '@/components/ui/product-selection-modal';
import { Footer } from '@/components/ui/footer';
import { ShoppingBag, Filter } from 'lucide-react';

export default function Lookbook() {
  const { addItem } = useCartHelpers();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLookItem, setSelectedLookItem] = useState<LookbookItem | null>(null);

  const { data: lookbookItems = [] } = useQuery<LookbookItem[]>({
    queryKey: ['/api/lookbook'],
  });

  const { data: categoryItems = [] } = useQuery<LookbookItem[]>({
    queryKey: ['/api/lookbook/category', selectedCategory],
    enabled: selectedCategory !== 'all',
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const categories = ['all', 'wedding', 'corporate', 'outdoor', 'luxe'];
  const displayItems = selectedCategory === 'all' ? lookbookItems : categoryItems;

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      all: 'All Looks',
      wedding: 'Wedding',
      corporate: 'Corporate',
      outdoor: 'Outdoor',
      luxe: 'Luxe',
    };
    return labels[category] || category;
  };

  const openShopModal = (item: LookbookItem) => {
    setSelectedLookItem(item);
    setIsModalOpen(true);
  };

  const closeShopModal = () => {
    setIsModalOpen(false);
    setSelectedLookItem(null);
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="pt-20 pb-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold mb-6">The Lookbook</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real events, real style. Get inspired by our curated gallery of unforgettable moments
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-2 rounded-full"
                data-testid={`lookbook-filter-${category}`}
              >
                {getCategoryLabel(category)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Gallery */}
      <section className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          {displayItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No lookbook items found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="lookbook-grid">
              {displayItems.map((item) => (
                <Card
                  key={item.id}
                  className="lookbook-item group cursor-pointer overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  data-testid={`lookbook-item-${item.id}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay that appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="bg-black/50 text-white">
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </Badge>
                          {item.products && item.products.length > 0 && (
                            <Badge className="bg-accent text-accent-foreground">
                              {item.products.length} pieces
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-serif text-xl font-bold mb-2">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm opacity-90 mb-3">{item.description}</p>
                        )}
                        <Button
                          size="sm"
                          className="bg-accent text-accent-foreground hover:bg-accent/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            openShopModal(item);
                          }}
                          data-testid={`shop-look-${item.id}`}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Shop the Look
                        </Button>
                      </div>
                    </div>

                    {/* Static category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Inspiration CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Create Your Own Signature Look
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Inspired by what you see? Our design team can help you create a custom look that's uniquely yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg"
              data-testid="custom-consultation-button"
            >
              Book Custom Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg"
              data-testid="browse-collections-button"
            >
              Browse Collections
            </Button>
          </div>
        </div>
      </section>
      <Footer />

      {/* Shop the Look Modal */}
      <ProductSelectionModal
        isOpen={isModalOpen}
        onClose={closeShopModal}
        title={selectedLookItem?.title || "Shop the Look"}
        description={selectedLookItem?.description || undefined}
        lookbookItem={selectedLookItem}
        products={products}
        showGuestCountInput={false}
      />
    </main>
  );
}
