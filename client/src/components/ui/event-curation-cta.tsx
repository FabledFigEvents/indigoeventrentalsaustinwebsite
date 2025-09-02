import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export function EventCurationCTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-serif font-bold mb-6">
          Ready to Curate Your Event Look?
        </h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Inspired by what you see? Our design team can help you create a custom look that's uniquely yours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <a>
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg"
                data-testid="custom-consultation-button"
              >
                Book Custom Consultation
              </Button>
            </a>
          </Link>
          <Link href="/collections">
            <a>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg"
                data-testid="browse-collections-button"
              >
                Browse Collections
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
