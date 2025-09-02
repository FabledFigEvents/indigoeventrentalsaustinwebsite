import { Link, useLocation } from 'wouter';
import { Phone, ShoppingCart, Menu, X, MessageCircle, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useCartHelpers } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { getItemCount, toggleCart } = useCartHelpers();

  const navItems = [
    { href: '/collections', label: 'Designer Collections' },
    { href: '/catalog', label: 'Product Catalog' },
    { href: '/lookbook', label: 'Lookbook' },
    { href: '/about', label: 'About Indigo' },
    { href: '/blog', label: 'Blog' },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <a
            className={`text-foreground hover:text-primary transition-colors font-medium ${
              mobile ? 'block py-2 text-lg' : ''
            } ${location === item.href ? 'text-primary' : ''}`}
            onClick={() => mobile && setIsOpen(false)}
            data-testid={`nav-link-${item.label.toLowerCase()}`}
          >
            {item.label}
          </a>
        </Link>
      ))}
    </>
  );

  return (
    <header className="fixed top-0 w-full bg-white z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex-shrink-0" data-testid="logo-link">
              <h1 className="text-2xl font-serif font-bold text-primary">INDIGO</h1>
              <p className="text-xs text-muted-foreground tracking-wide">AUSTIN EVENT RENTALS</p>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleCart}
              className="bg-primary text-primary-foreground hover:bg-white hover:text-primary hover:border-primary border border-transparent transition-colors duration-300"
              data-testid="cart-button"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart (<span className="cart-count" data-testid="cart-count">{getItemCount()}</span>)
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="" data-testid="mobile-menu-trigger">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0 overflow-hidden">
                <div className="flex flex-col h-full overflow-hidden">
                  {/* Header */}
                  <div className="p-6 border-b border-border bg-primary text-primary-foreground">
                    <div className="mb-4">
                      <h1 className="text-2xl font-serif font-bold">INDIGO</h1>
                      <p className="text-xs opacity-90 tracking-wide">AUSTIN EVENT RENTALS</p>
                    </div>
                    <p className="text-sm opacity-90">
                      Curating signature style for Austin's most memorable events
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <nav className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                        Explore
                      </p>
                      {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <a
                            className={`flex items-center justify-between p-3 rounded-lg transition-colors group hover:bg-muted ${
                              location === item.href 
                                ? 'bg-primary/10 text-primary border border-primary/20' 
                                : 'text-foreground hover:text-primary'
                            }`}
                            onClick={() => setIsOpen(false)}
                            data-testid={`mobile-nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <span className="font-medium">{item.label}</span>
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </Link>
                      ))}
                    </nav>

                    {/* Quick Actions */}
                    <div className="mt-8">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                        Quick Actions
                      </p>
                      <div className="space-y-3">
                        <Link href="/contact">
                          <a
                            className="flex items-center p-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <MessageCircle className="h-4 w-4 mr-3" />
                            <span className="font-medium">Send us a Message</span>
                          </a>
                        </Link>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            toggleCart();
                          }}
                          className="w-full flex items-center p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                          <ShoppingCart className="h-4 w-4 mr-3" />
                          <span className="font-medium">View Cart ({getItemCount()})</span>
                        </button>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-8">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                        Get in Touch
                      </p>
                      <div className="space-y-3">
                        <a
                          href="tel:5125188400"
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                          data-testid="mobile-phone-link"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Phone className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">(512) 518-8400</p>
                            <p className="text-xs text-muted-foreground">Call for consultation</p>
                          </div>
                        </a>
                        
                        <a
                          href="mailto:contact@indigoatx.com"
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                          data-testid="mobile-email-link"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">contact@indigoatx.com</p>
                            <p className="text-xs text-muted-foreground">Email us anytime</p>
                          </div>
                        </a>

                        <div className="flex items-center space-x-3 p-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Austin, TX</p>
                            <p className="text-xs text-muted-foreground">& surrounding areas</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-border bg-muted/30">
                    <div className="flex items-center space-x-3 mb-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <p className="font-medium">Response Time</p>
                        <p className="text-xs text-muted-foreground">Within 24 hours</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Professional event styling with delivery, setup, and breakdown services across Austin and surrounding areas.
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export function StickyQuoteButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link href="/contact">
        <a>
          <Button
            className="bg-accent text-accent-foreground shadow-lg hover:shadow-xl hover:bg-white hover:text-accent hover:border-accent border border-transparent rounded-full px-6 py-3 transition-colors duration-300"
            data-testid="sticky-message-button"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Send a Message
          </Button>
        </a>
      </Link>
    </div>
  );
}
