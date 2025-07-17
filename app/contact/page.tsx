'use client';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/scroll-reveal';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const messageParam = searchParams.get('message') || '';
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (messageRef.current && messageParam) {
      messageRef.current.value = messageParam;
    }
  }, [messageParam]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get in touch with us to discuss your customized solution needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Get In Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  We're here to help with your customized solution needs.
                  Contact us today to discuss how we can help you.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-secondary mr-4 mt-1" />
                    <div>
                      <h3 className="font-bold text-foreground">Address</h3>
                      <p className="text-muted-foreground">
                        Eklavya, Sector 21, Kharghar, Navi Mumbai, Maharashtra,
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-secondary mr-4 mt-1" />
                    <div>
                      <h3 className="font-bold text-foreground">Phone</h3>
                      <p className="text-muted-foreground">+91-9323192750</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-secondary mr-4 mt-1" />
                    <div>
                      <h3 className="font-bold text-foreground">Email</h3>
                      <p className="text-muted-foreground">
                        mridulverma@specialiseproducts.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Business Hours
                  </h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li>
                      <span className="font-medium">Monday - Friday:</span> 9:00
                      AM - 6:00 PM IST
                    </li>
                    <li>
                      <span className="font-medium">Saturday:</span> 9:00 AM -
                      1:00 PM IST
                    </li>
                    <li>
                      <span className="font-medium">Sunday:</span> Closed
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-background p-8 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Send Us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-muted-foreground mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 bg-card border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-muted-foreground mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-card border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your Email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 bg-card border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Phone Number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 bg-card border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Subject"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      ref={messageRef}
                      rows={5}
                      className="w-full px-4 py-2 bg-card border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Message"
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Our Location
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Visit us at our office in Navi Mumbai, Maharashtra, India.
              </p>
            </div>
          </ScrollReveal>

          <div className="rounded-xl overflow-hidden h-96 bg-card flex items-center justify-center">
            {/* Placeholder for map - in a real implementation, you would use Google Maps or similar */}
            <div className="text-muted-foreground">
              Map will be displayed here
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
