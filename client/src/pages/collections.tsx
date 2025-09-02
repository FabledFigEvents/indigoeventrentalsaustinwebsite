import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Collection, Product } from '@shared/schema';
import { useCartHelpers } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import { ProductSelectionModal } from '@/components/ui/product-selection-modal';

export default function Collections() {
  const { addItem } = useCartHelpers();
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: collections = [] } = useQuery<Collection[]>({
    queryKey: ['/api/collections'],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const getCollectionProducts = (productIds: string[] | null) => {
    if (!productIds) return [];
    return products.filter(product => productIds.includes(product.id));
  };

  const openCollectionModal = (collection: Collection) => {
    setSelectedCollection(collection);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCollection(null);
    setIsModalOpen(false);
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="pt-20 pb-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold mb-6">Designer Collections</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Event setups curated as fashion lines — each collection tells a unique story and creates an unforgettable atmosphere
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" data-testid="collections-grid">
            {collections.map((collection) => {
              const collectionProducts = getCollectionProducts(collection.products);
              
              return (
                <Card
                  key={collection.id}
                  className="collection-card overflow-hidden shadow-lg"
                  data-testid={`collection-card-${collection.id}`}
                >
                  {/* Collection Hero Image */}
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={collection.imageUrl}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-accent text-accent-foreground">
                          Seasonal Lookbook
                        </Badge>
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {collection.vibe.charAt(0).toUpperCase() + collection.vibe.slice(1)}
                        </Badge>
                      </div>
                      <h2 className="text-3xl font-serif font-bold mb-2">{collection.name}</h2>
                      <p className="text-lg opacity-90">{collection.description}</p>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    {/* Collection Products Preview */}
                    <div className="mb-6">
                      <h3 className="font-serif text-xl font-bold mb-4">Featured Pieces</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {collectionProducts.slice(0, 3).map((product) => (
                          <div key={product.id} className="text-center">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-20 object-cover rounded-md mb-2"
                            />
                            <p className="text-xs font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">${product.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Style My Event Button */}
                    <div className="space-y-4">
                      <Button
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => openCollectionModal(collection)}
                        data-testid={`add-collection-${collection.id}`}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Style My Event With This Look
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        Preview quantities and adjust for your guest count
                      </p>
                    </div>

                    {/* View Individual Products */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <Button
                        variant="ghost"
                        className="w-full text-primary hover:text-primary/80"
                        data-testid={`view-products-${collection.id}`}
                      >
                        View Individual Products
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {collections.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold mb-2">New Collections Coming Soon</h3>
              <p className="text-muted-foreground">
                Our designers are curating fresh seasonal lookbooks. Check back soon for the latest collections.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Collection Benefits */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-6">Why Choose Our Collections?</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Each collection is thoughtfully curated to create a cohesive, stunning event aesthetic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Curated Harmony</h3>
              <p className="opacity-90">
                Every piece is selected to work perfectly together, creating a cohesive design story.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Smart Scaling</h3>
              <p className="opacity-90">
                Collections automatically scale to your guest count, ensuring perfect proportions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Effortless Style</h3>
              <p className="opacity-90">
                Skip the guesswork — our collections deliver instant sophistication and style.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Product Selection Modal */}
      <ProductSelectionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedCollection?.name || ""}
        description={selectedCollection?.description}
        collection={selectedCollection}
        products={products}
        guestCount={50}
        showGuestCountInput={true}
      />
    </main>
  );
}
