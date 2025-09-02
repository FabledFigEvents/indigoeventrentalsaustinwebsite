import { Link } from 'wouter';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
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
              <li><Link href="/about"><a className="hover:opacity-100 transition-opacity">Delivery & Setup</a></Link></li>
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
  );
}
