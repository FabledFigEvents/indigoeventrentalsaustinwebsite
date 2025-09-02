import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useState } from 'react';
import { Product, Collection } from '@shared/schema';
import { useCartHelpers } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Star, Users, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function Home() {
  const { addItem } = useCartHelpers();
  const [selectedVibe, setSelectedVibe] = useState<string>('');

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

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
                  data-testid="browse-collections-button"
                >
                  Browse Collections
                </Button>
              </a>
            </Link>
            <Link href="/contact">
              <a>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
                  data-testid="get-quote-button"
                >
                  Get a Quote
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
                    <div className="relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        size="sm"
                        className="absolute top-4 right-4 bg-white/90 text-primary hover:bg-white"
                        onClick={() => addItem(product)}
                        data-testid={`add-to-cart-${product.id}`}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-bold mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                      <p className="font-medium">${product.price} each</p>
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
                  <Link href={`/collections`}>
                    <a
                      className="text-primary font-medium hover:underline inline-flex items-center"
                      data-testid={`view-collection-${collection.id}`}
                    >
                      Style My Event With This Look
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Link>
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

      {/* Services Overview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From vision to reality, we handle every detail with the precision of a luxury fashion house
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Personal Consultation</h3>
              <p className="text-muted-foreground">
                One-on-one styling sessions to understand your vision and create the perfect event aesthetic.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Curated Collections</h3>
              <p className="text-muted-foreground">
                Handpicked pieces styled into cohesive collections that tell your unique story.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Complete Setup</h3>
              <p className="text-muted-foreground">
                Professional delivery, setup, and breakdown services ensure your event is picture-perfect.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif font-bold mb-6">
            Ready to Curate Your Event Look?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's schedule your personal styling consultation and bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <a>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
                  data-testid="book-consultation-button"
                >
                  Book Your Style Consultation
                </Button>
              </a>
            </Link>
            <Link href="/catalog">
              <a>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent px-8 py-4 text-lg"
                  data-testid="browse-catalog-button"
                >
                  Browse the Catalog
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">INDIGO</h3>
              <p className="text-sm opacity-80 mb-4">Austin Event Rentals</p>
              <p className="text-sm opacity-70">
                Transforming Austin gatherings with fashion-forward event styling and luxury rental experiences.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Collections</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link href="/collections"><a className="hover:opacity-100 transition-opacity">The Midnight Luxe</a></Link></li>
                <li><Link href="/collections"><a className="hover:opacity-100 transition-opacity">The Garden Gala</a></Link></li>
                <li><Link href="/collections"><a className="hover:opacity-100 transition-opacity">The Modern Minimalist</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link href="/lookbook"><a className="hover:opacity-100 transition-opacity">Wedding Styling</a></Link></li>
                <li><Link href="/lookbook"><a className="hover:opacity-100 transition-opacity">Corporate Events</a></Link></li>
                <li><Link href="/lookbook"><a className="hover:opacity-100 transition-opacity">Private Parties</a></Link></li>
                <li><Link href="/process"><a className="hover:opacity-100 transition-opacity">Delivery & Setup</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="tel:5125188400" className="hover:opacity-100 transition-opacity">
                    (512) 518-8400
                  </a>
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:contact@indigoatx.com" className="hover:opacity-100 transition-opacity">
                    contact@indigoatx.com
                  </a>
                </p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Austin, TX & Surrounding Areas
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 mt-12 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2024 Indigo Event Rentals Austin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
