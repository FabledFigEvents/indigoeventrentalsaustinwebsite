import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { Footer } from '@/components/ui/footer';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'Spring Wedding Trends: Romantic Pastels & Garden Elegance',
      excerpt: 'Discover the top wedding design trends for spring 2024, from blush pink linens to organic floral arrangements that bring garden party vibes to your celebration.',
      author: 'Amanda Chen',
      date: '2024-03-15',
      category: 'Wedding Trends',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'How to Create the Perfect Corporate Event Setup',
      excerpt: 'From networking mixers to annual galas, learn how to design corporate events that impress clients and inspire teams with professional yet welcoming atmospheres.',
      author: 'Justin Rodriguez',
      date: '2024-03-08',
      category: 'Corporate Events',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'Maximizing Small Spaces: Design Tips for Intimate Gatherings',
      excerpt: 'Transform cozy venues into stunning event spaces with strategic furniture placement, lighting tricks, and décor choices that make small feel sophisticated.',
      author: 'Amanda Chen',
      date: '2024-03-01',
      category: 'Design Tips',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      readTime: '4 min read',
    },
    {
      id: 4,
      title: 'Sustainable Event Design: Eco-Friendly Rentals & Practices',
      excerpt: 'Learn how to create beautiful, environmentally conscious events with sustainable rental choices, waste reduction strategies, and eco-friendly décor alternatives.',
      author: 'Justin Rodriguez',
      date: '2024-02-22',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      readTime: '6 min read',
    },
    {
      id: 5,
      title: 'Color Psychology in Event Design: Setting the Perfect Mood',
      excerpt: 'Understand how different color palettes influence guest emotions and create the right atmosphere for your celebration, from energizing brights to calming neutrals.',
      author: 'Amanda Chen',
      date: '2024-02-15',
      category: 'Design Theory',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      readTime: '5 min read',
    },
    {
      id: 6,
      title: 'Behind the Scenes: A Day in the Life of Event Setup',
      excerpt: 'Follow our team through a typical event day, from early morning prep to the final styling touches that transform spaces into unforgettable experiences.',
      author: 'Justin Rodriguez',
      date: '2024-02-08',
      category: 'Behind the Scenes',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      readTime: '8 min read',
    },
  ];

  const categories = [
    'All Posts',
    'Wedding Trends',
    'Corporate Events',
    'Design Tips',
    'Sustainability',
    'Design Theory',
    'Behind the Scenes',
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold mb-6">The Indigo Journal</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Design inspiration, event trends, and expert insights from the world of luxury event styling
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All Posts' ? 'default' : 'outline'}
                className="px-6 py-2 rounded-full"
                data-testid={`category-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Featured
              </Badge>
              <Badge variant="outline">
                {blogPosts[0].category}
              </Badge>
            </div>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <CardContent className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-serif font-bold mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {blogPosts[0].author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(blogPosts[0].date)}
                    </div>
                    <span>{blogPosts[0].readTime}</span>
                  </div>

                  <Button 
                    className="self-start bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid={`read-post-${blogPosts[0].id}`}
                  >
                    Read Full Article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {post.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.date)}
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    data-testid={`read-post-${post.id}`}
                  >
                    Read Article
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Stay Inspired</h2>
            <p className="text-muted-foreground mb-8">
              Get the latest design trends, event inspiration, and styling tips delivered straight to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="newsletter-email-input"
              />
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                data-testid="newsletter-subscribe-button"
              >
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Unsubscribe at any time. Privacy policy applies.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Ready to Create Your Event?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let our design expertise bring your vision to life with curated rentals and professional styling.
            </p>
            
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg"
                data-testid="blog-contact-cta"
              >
                Start Your Project
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}