import { Link, useLocation } from 'wouter';
import { Phone, ShoppingCart, Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useCartHelpers } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { getItemCount, toggleCart } = useCartHelpers();

  const navItems = [
    { href: '/collections', label: 'Collections' },
    { href: '/catalog', label: 'Catalog' },
    { href: '/lookbook', label: 'Lookbook' },
    { href: '/process', label: 'Process' },
    { href: '/about', label: 'About' },
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
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
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
            <a
              href="tel:5125188400"
              className="hidden sm:flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="phone-link"
            >
              <Phone className="h-4 w-4 mr-2" />
              (512) 518-8400
            </a>
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
                <Button variant="ghost" className="md:hidden" data-testid="mobile-menu-trigger">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <NavLinks mobile />
                  <div className="pt-4 border-t border-border">
                    <a
                      href="tel:5125188400"
                      className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                      data-testid="mobile-phone-link"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      (512) 518-8400
                    </a>
                  </div>
                </nav>
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
