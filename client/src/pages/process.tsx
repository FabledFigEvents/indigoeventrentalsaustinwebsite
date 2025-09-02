import { MessageCircle, Palette, Star, CheckCircle, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'wouter';
import { Footer } from '@/components/ui/footer';

export default function Process() {
  const processSteps = [
    {
      icon: MessageCircle,
      title: 'Consultation',
      subtitle: 'Your Fitting',
      description: 'Your personal fitting session where we understand your vision, style preferences, and event dreams.',
      details: [
        'One-on-one consultation with our design team',
        'Mood board creation and style exploration',
        'Budget planning and timeline discussion',
        'Venue assessment and logistics planning',
      ],
    },
    {
      icon: Palette,
      title: 'Curation',
      subtitle: 'Tailored to Your Event',
      description: 'Our designers handpick every element, creating a cohesive look tailored specifically to your event.',
      details: [
        'Custom selection of furniture and décor',
        'Color palette and theme development',
        'Layout design and space planning',
        'Final approval and adjustments',
      ],
    },
    {
      icon: Star,
      title: 'Delivery & Styling',
      subtitle: 'Runway-Ready',
      description: 'Professional setup and styling ensures your event is picture-perfect from the first guest\'s arrival.',
      details: [
        'Timely delivery and professional setup',
        'On-site styling and final touches',
        'Quality inspection and adjustments',
        'Post-event breakdown and pickup',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking 4-6 weeks in advance for optimal selection, though we can often accommodate shorter timelines for smaller events.',
    },
    {
      question: 'Do you provide setup and breakdown services?',
      answer: 'Absolutely! Our team handles complete delivery, professional setup, and post-event breakdown so you can focus on your guests.',
    },
    {
      question: 'What\'s your coverage area?',
      answer: 'We proudly serve Austin and surrounding areas including Round Rock, Cedar Park, Lake Travis, Georgetown, and more. Delivery fees vary by location.',
    },
    {
      question: 'Can I make changes to my order after booking?',
      answer: 'Yes, we understand that plans can change. We allow modifications up to 2 weeks before your event date, subject to availability.',
    },
    {
      question: 'What happens if an item is damaged?',
      answer: 'We offer an optional damage waiver that covers normal wear and tear. For significant damage, repair or replacement costs may apply.',
    },
    {
      question: 'Do you work with other vendors?',
      answer: 'Yes! We collaborate seamlessly with caterers, florists, photographers, and other vendors to ensure your event runs smoothly.',
    },
  ];

  const additionalServices = [
    {
      icon: CheckCircle,
      title: 'Full Event Coordination',
      description: 'End-to-end event management with our partner vendors',
    },
    {
      icon: Clock,
      title: 'Same-Day Setup',
      description: 'Professional setup on the morning of your event',
    },
    {
      icon: Truck,
      title: 'Emergency Support',
      description: '24/7 support hotline during your event',
    },
  ];

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold mb-6">The Indigo Process</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Like a haute couture atelier, every detail is crafted with precision and passion
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.title} className="text-center" data-testid={`process-step-${index + 1}`}>
                  <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">{step.title}</h3>
                  <p className="opacity-90 mb-4">{step.description}</p>
                  <span className="text-accent font-medium">{step.subtitle}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Your Journey With Us</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From initial consultation to event day, we guide you through every step
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={step.title} className="p-8">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Additional Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beyond rentals, we offer comprehensive event support services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.title} className="text-center p-8">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about working with Indigo
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-0">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Begin Your Event Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's start with a consultation to understand your vision and bring it to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <a>
                <Button
                  size="action"
                  data-testid="schedule-consultation-button"
                >
                  Schedule Your Consultation
                </Button>
              </a>
            </Link>
            <Link href="/collections">
              <a>
                <Button
                  variant="outline"
                  size="action"
                  className="border-2 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent"
                  data-testid="view-collections-button"
                >
                  View Our Collections
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
