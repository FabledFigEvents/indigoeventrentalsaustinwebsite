import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useState } from 'react';
import { Product, Collection } from '@shared/schema';
import { useCartHelpers } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ProductSelectionModal } from '@/components/ui/product-selection-modal';
import { Footer } from '@/components/ui/footer';
import { EventCurationCTA } from '@/components/ui/event-curation-cta';
import { Sparkles, Star, Users, ArrowRight, Phone, Mail, MapPin, Plus, Minus, X, ShoppingBag } from 'lucide-react';

export default function Home() {
  const { addItem } = useCartHelpers();
  const [selectedVibe, setSelectedVibe] = useState<string>('professional');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLookImage, setSelectedLookImage] = useState<any>(null);
  const [isLookImageModalOpen, setIsLookImageModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isShopLookModalOpen, setIsShopLookModalOpen] = useState(false);
  const [selectedLookForShopping, setSelectedLookForShopping] = useState<any>(null);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: collections = [] } = useQuery<Collection[]>({
    queryKey: ['/api/collections'],
  });

  const { data: vibeProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products/vibe', selectedVibe],
    enabled: !!selectedVibe,
  });

  const vibes = ['professional', 'romantic', 'chic', 'playful', 'luxe'];

  const featuredCollections = collections.slice(0, 3);

  const realIndigoLooks = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Elegant table setting with floral arrangements",
      title: "Garden Romance Wedding",
      description: "A dreamy outdoor ceremony featuring our vintage gold Chiavari chairs and lush botanical centerpieces. The bride chose soft blush linens that perfectly complemented the natural garden setting, creating an intimate atmosphere for 120 guests.",
      products: ["chiavari-chair-gold", "blush-linen-tablecloth", "crystal-centerpiece-vase", "gold-charger-plate"]
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Sparkling celebration with confetti and lights",
      title: "Corporate Gala Night",
      description: "A sophisticated corporate event that transformed a downtown venue into a luxurious celebration space. Our crystal chandeliers and modern lounge furniture created the perfect backdrop for networking and entertainment for 200 professionals.",
      products: ["crystal-chandelier", "modern-lounge-chair", "black-linen-tablecloth", "silver-charger-plate"]
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Colorful balloon arrangement for celebration",
      title: "Birthday Celebration",
      description: "A vibrant and playful birthday party setup featuring our colorful accent pieces and whimsical decor. The client wanted a fun, Instagram-worthy celebration that would delight guests of all ages - mission accomplished with 80 happy party-goers!",
      products: ["chiavari-chair-silver", "colorful-accent-pillow", "festive-table-runner", "party-centerpiece"]
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Elegant jewelry and accessories detail",
      title: "Luxury Bridal Shower",
      description: "An intimate bridal shower showcasing our attention to detail and luxury styling. From the delicate table settings to the sophisticated floral arrangements, every element was curated to create a memorable experience for the bride-to-be and her closest friends.",
      products: ["chiavari-chair-gold", "ivory-linen-tablecloth", "crystal-centerpiece-vase", "rose-gold-charger-plate"]
    }
  ];

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

  const openCollectionModal = (collection: Collection) => {
    setSelectedCollection(collection);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCollection(null);
    setIsModalOpen(false);
  };

  const openLookImageModal = (lookImage: any) => {
    setSelectedLookImage(lookImage);
    setIsImageLoaded(false);
    setIsLookImageModalOpen(true);
  };

  const closeLookImageModal = () => {
    setIsLookImageModalOpen(false);
    setTimeout(() => {
      setSelectedLookImage(null);
      setIsImageLoaded(false);
    }, 300);
  };

  const openShopLookModal = (lookImage: any) => {
    setSelectedLookForShopping(lookImage);
    setIsShopLookModalOpen(true);
    closeLookImageModal();
  };

  const closeShopLookModal = () => {
    setIsShopLookModalOpen(false);
    setSelectedLookForShopping(null);
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&h=1400)',
          }}
        ></div>
        <div className="absolute inset-0 hero-overlay"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Curate Your<br />
            <span className="italic">Signature</span> Style
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light tracking-wide">
            Every gathering deserves a signature look.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections">
              <a>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-white hover:text-primary transition-colors duration-300 px-8 py-4 text-lg"
                  data-testid="browse-collections-button"
                >
                  Browse Collections
                </Button>
              </a>
            </Link>
            <Link href="/contact">
              <a>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary transition-colors duration-300 px-8 py-4 text-lg bg-transparent"
                  data-testid="get-quote-button"
                >
                  Start a Quote
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Style Your Event Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Style Your Event</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover your event's personality with our curated style guide
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {vibes.map((vibe) => (
              <Button
                key={vibe}
                variant={selectedVibe === vibe ? 'default' : 'outline'}
                onClick={() => setSelectedVibe(selectedVibe === vibe ? '' : vibe)}
                className="px-6 py-3 rounded-full"
                data-testid={`vibe-filter-${vibe}`}
              >
                {vibe.charAt(0).toUpperCase() + vibe.slice(1)}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="style-results">
            {selectedVibe ? (
              vibeProducts.length > 0 ? (
                vibeProducts.slice(0, 3).map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-bold mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-medium">${product.price} each</p>
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
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <div className="bg-card rounded-xl p-8 shadow-sm">
                    <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-bold mb-2">
                      Curating {selectedVibe.charAt(0).toUpperCase() + selectedVibe.slice(1)} Looks
                    </h3>
                    <p className="text-muted-foreground">
                      Our designers are selecting the perfect pieces for your {selectedVibe} event style...
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div className="col-span-full text-center text-muted-foreground py-12">
                <Sparkles className="h-12 w-12 mx-auto mb-4" />
                <p>Select a style above to see curated recommendations</p>
              </div>
            )}
          </div>
          
          {/* View Full Catalog Button */}
          <div className="text-center mt-12">
            <Link href="/catalog">
              <a>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid="view-full-catalog-button"
                >
                  View Full Product Catalog
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold mb-6">Seasonal Lookbooks</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Curated collections that transform your vision into reality, styled like fashion's finest
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-testid="featured-collections">
            {featuredCollections.map((collection) => (
              <Card key={collection.id} className="collection-card group cursor-pointer overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={collection.imageUrl}
                    alt={collection.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-accent text-accent-foreground">
                      New Collection
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-serif font-bold mb-2">{collection.name}</h3>
                  <p className="text-muted-foreground mb-4">{collection.description}</p>
                  <Button
                    variant="ghost"
                    className="text-primary font-medium hover:text-primary/80 inline-flex items-center p-0 h-auto"
                    onClick={() => openCollectionModal(collection)}
                    data-testid={`view-collection-${collection.id}`}
                  >
                    Style My Event With This Look
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/collections">
              <a>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="view-all-collections-button"
                >
                  View All Collections
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Real Indigo Looks */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Real Indigo Looks</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our clients have styled their signature moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {realIndigoLooks.map((lookImage) => (
              <div 
                key={lookImage.id}
                className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                onClick={() => openLookImageModal(lookImage)}
                data-testid={`look-image-${lookImage.id}`}
              >
                <img
                  src={lookImage.src.replace('w=800&h=800', 'w=400&h=400')}
                  alt={lookImage.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-semibold drop-shadow-lg">{lookImage.title}</p>
                  <p className="text-white/80 text-xs mt-1">Click to view</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/lookbook">
              <a>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
                  data-testid="view-full-lookbook-button"
                >
                  View Full Lookbook
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      <EventCurationCTA />

      <Footer />

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

      {/* Real Indigo Looks Image Modal */}
      {isLookImageModalOpen && selectedLookImage && (
        <div 
          className={`fixed inset-0 bg-black/70 z-50 flex items-center justify-center transition-opacity duration-300 ${
            isLookImageModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeLookImageModal}
        >
          {/* Image Container */}
          <div 
            className={`relative max-w-[90vw] max-h-[90vh] transition-all duration-500 ease-out ${
              isImageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Right Buttons */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              {/* Shop the Look Button */}
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  openShopLookModal(selectedLookImage);
                }}
                data-testid={`shop-look-modal-${selectedLookImage.id}`}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop the Look
              </Button>
              
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 transition-colors"
                onClick={closeLookImageModal}
                data-testid="close-look-modal-button"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <img
              src={selectedLookImage.src}
              alt={selectedLookImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onLoad={() => setIsImageLoaded(true)}
              data-testid={`large-look-image-${selectedLookImage.id}`}
            />
            
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-2xl font-serif font-bold mb-2" data-testid={`look-title-${selectedLookImage.id}`}>
                {selectedLookImage.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed" data-testid={`look-description-${selectedLookImage.id}`}>
                {selectedLookImage.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shop the Look Modal for Real Indigo Looks */}
      <ProductSelectionModal
        isOpen={isShopLookModalOpen}
        onClose={closeShopLookModal}
        title={selectedLookForShopping?.title || "Shop the Look"}
        description={selectedLookForShopping?.description || undefined}
        lookbookItem={selectedLookForShopping}
        products={products}
        showGuestCountInput={false}
      />
    </main>
  );
}
