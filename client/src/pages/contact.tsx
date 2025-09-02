import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertQuoteRequestSchema, type InsertQuoteRequest } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useCartHelpers } from '@/lib/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, MapPin, Calendar, Users, MessageCircle, Sparkles, CheckCircle } from 'lucide-react';
import { Footer } from '@/components/ui/footer';

export default function Contact() {
  const { 
    items, 
    guestCount, 
    location, 
    getSubtotal, 
    calculateDeliveryFee, 
    calculateSetupFee, 
    getQuoteTotal 
  } = useCartHelpers();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertQuoteRequest>({
    resolver: zodResolver(insertQuoteRequestSchema.extend({
      eventDate: insertQuoteRequestSchema.shape.eventDate.refine(
        (date) => new Date(date) > new Date(),
        "Event date must be in the future"
      ),
    })),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      guestCount: guestCount || undefined,
      location: location || '',
      message: items.length > 0 ? `I'm interested in a quote for the items in my cart. My event will have approximately ${guestCount} guests in ${location}.` : '',
      items: items.map(item => `${item.product.name} (${item.quantity}x)`),
    },
  });

  const createQuoteMutation = useMutation({
    mutationFn: async (data: InsertQuoteRequest) => {
      const response = await apiRequest('POST', '/api/quotes', {
        ...data,
        items: items.map(item => `${item.product.name} (${item.quantity}x)`),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
      setIsSubmitted(true);
      toast({
        title: "Quote Request Submitted",
        description: "We'll get back to you within 24 hours with a detailed quote.",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertQuoteRequest) => {
    createQuoteMutation.mutate(data);
  };

  const eventTypes = [
    'Wedding',
    'Corporate Event',
    'Birthday Party',
    'Anniversary',
    'Baby Shower',
    'Graduation',
    'Holiday Party',
    'Fundraiser',
    'Other',
  ];

  const subtotal = getSubtotal();
  const estimatedDelivery = calculateDeliveryFee();
  const estimatedSetup = calculateSetupFee();
  const estimatedTotal = getQuoteTotal();

  if (isSubmitted) {
    return (
      <main className="pt-20">
        <section className="py-20 min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto text-center p-8">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-4xl font-serif font-bold mb-4">Quote Request Received</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Thank you for choosing Indigo! We've received your styling consultation request.
                </p>
                <p className="text-muted-foreground mb-8">
                  Our team will review your requirements and get back to you within 24 hours with a detailed quote and next steps for your event.
                </p>
                <div className="space-y-4">
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    data-testid="submit-another-button"
                  >
                    Submit Another Request
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Questions? Call us at (512) 518-8400 or email contact@indigoatx.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold mb-6">Book Your Style</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Ready to curate your event look? Let's get started with your personal styling consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Consultation</h3>
              <p className="opacity-90">We'll discuss your vision and style preferences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Curation</h3>
              <p className="opacity-90">Custom selection tailored to your event</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Delivery</h3>
              <p className="opacity-90">Professional setup for your perfect day</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-serif font-bold">
                    Tell Us About Your Event
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Share your vision and we'll create a custom quote tailored to your needs
                  </p>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your full name" 
                                  {...field}
                                  data-testid="input-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="Enter your email" 
                                  {...field}
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel"
                                  placeholder="(512) 555-0123" 
                                  {...field}
                                  value={field.value || ''}
                                  data-testid="input-phone"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="eventType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Type *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-event-type">
                                    <SelectValue placeholder="Select event type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {eventTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="eventDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Date *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="date"
                                  {...field}
                                  data-testid="input-event-date"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="guestCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expected Guest Count</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number"
                                  placeholder={guestCount?.toString() || "50"}
                                  min="1"
                                  max="1000"
                                  {...field}
                                  value={field.value || guestCount || ''}
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                  data-testid="input-guest-count"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Location</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={location || "Austin, TX or specific venue name"}
                                {...field}
                                value={field.value || location || ''}
                                data-testid="input-location"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tell Us About Your Vision</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your event style, theme, special requirements, or any questions you have..."
                                className="min-h-[120px]"
                                {...field}
                                value={field.value || ''}
                                data-testid="textarea-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
                        disabled={createQuoteMutation.isPending}
                        data-testid="submit-quote-button"
                      >
                        {createQuoteMutation.isPending ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting Request...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-5 w-5 mr-2" />
                            Request Detailed Quote
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Current Quote Summary */}
              {items.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif font-bold">Current Quote</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Guests:</span>
                        <span className="font-medium">{guestCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{location}</span>
                      </div>
                    </div>
                    <Separator />
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center text-sm">
                        <span>{item.product.name} (×{item.quantity})</span>
                        <span>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Delivery Fee</span>
                        <span>${estimatedDelivery.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Setup Service</span>
                        <span>${estimatedSetup.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground text-xs">
                        <span>Damage Waiver</span>
                        <span>$25.00</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Estimated Total</span>
                        <span>${estimatedTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif font-bold">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <a 
                        href="tel:5125188400" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        data-testid="contact-phone"
                      >
                        (512) 518-8400
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <a 
                        href="mailto:contact@indigoatx.com" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        data-testid="contact-email"
                      >
                        contact@indigoatx.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Service Area</p>
                      <p className="text-muted-foreground">Austin, TX & Surrounding Areas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif font-bold">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Quote Requests</span>
                      <span className="text-muted-foreground">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone Calls</span>
                      <span className="text-muted-foreground">Same day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email Inquiries</span>
                      <span className="text-muted-foreground">Within 24 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
