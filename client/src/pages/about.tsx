import { Users, Heart, Star, Award, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Design',
      description: 'Every piece we select and every setup we create is driven by our love for beautiful, meaningful design.',
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'We believe in building lasting relationships with our clients, becoming trusted partners in their event success.',
    },
    {
      icon: Star,
      title: 'Excellence in Service',
      description: 'From the first consultation to post-event cleanup, we maintain the highest standards of professional service.',
    },
    {
      icon: Award,
      title: 'Curated Quality',
      description: 'Every item in our inventory is carefully selected for its beauty, quality, and ability to transform spaces.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Events Styled' },
    { number: '100+', label: 'Happy Clients' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '3', label: 'Years of Excellence' },
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl font-serif font-bold mb-6">The House of Indigo</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Not just rentals. A signature style.
              </p>
              <p className="text-lg mb-6">
                Born from a vision to transform Austin's event landscape, Indigo brings the sophistication of haute couture to event design. We believe every gathering — from intimate dinners to grand celebrations — deserves the thoughtful curation of a luxury fashion house.
              </p>
              <p className="text-lg mb-8">
                Our founders, Justin and Amanda, combined their expertise in technology, operations, and design to create more than an event rental company — we're your creative partners in crafting unforgettable experiences.
              </p>

              <Link href="/contact">
                <a>
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="meet-team-button"
                  >
                    Meet Our Team
                  </Button>
                </a>
              </Link>
            </div>

            <div className="space-y-8">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Professional business portrait of Indigo founders Justin and Amanda"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />

              <div className="grid grid-cols-3 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                  alt="Diverse Austin wedding celebration with modern styling"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                  alt="Inclusive corporate gathering with professional modern setup"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                  alt="Joyful outdoor celebration with diverse group of friends and family"
                  className="w-full h-24 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Meet the Founders</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The creative minds behind Austin's most distinctive event rental experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-32 h-32 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">Justin Lauria</h3>
                <p className="text-muted-foreground text-sm mb-4">Director of Business Development</p>
                <p className="text-sm mb-6">
                  Technology visionary driving innovation and growth, ensuring every client experience exceeds expectations. Justin brings a background in technology, business operations, and project management to revolutionize the event rental industry.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Focus Areas:</strong></p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Inventory & Equipment Management</li>
                    <li>• Logistics & Operations</li>
                    <li>• Business Relationships</li>
                    <li>• Sales, Marketing & Branding</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-32 h-32 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-16 w-16 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">Amanda Vorpahl</h3>
                <p className="text-muted-foreground text-sm mb-4">Director of Operations</p>
                <p className="text-sm mb-6">
                  Operational excellence and client relations expert, orchestrating seamless event execution with scientific precision. Amanda's background in science, office administration, and people management ensures flawless customer experiences.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Focus Areas:</strong></p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Orders, Invoicing & Payments</li>
                    <li>• Scheduling & Coordination</li>
                    <li>• Labor & Human Resources</li>
                    <li>• Social Media Presence</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Building Austin's event community one celebration at a time
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" data-testid="company-stats">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <Card key={value.title} className="text-center p-6">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Our Mission</h2>
          <p className="text-xl opacity-90 max-w-4xl mx-auto mb-8">
            To become a trusted partner for clients, event planners, and venues seeking professional, reliable rental equipment and full delivery, setup, teardown, and pickup services. We maintain a highly positive reputation by being honest and upfront with customers, on-time for appointments, and following through on our promises — even when doing so is difficult.
          </p>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            This level of customer service is reflected in our online reviews and in the recommendations that our previous clients give to others through word-of-mouth.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-6">Let's Create Something Beautiful Together</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ready to bring your vision to life? Get in touch with our team today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <a
                  href="tel:5125188400"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  (512) 518-8400
                </a>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <a
                  href="mailto:contact@indigoatx.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  contact@indigoatx.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Service Area</h3>
                <p className="text-muted-foreground">
                  Austin, TX & Surrounding Areas
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact">
              <a>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
                  data-testid="contact-us-button"
                >
                  Get Started Today
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
