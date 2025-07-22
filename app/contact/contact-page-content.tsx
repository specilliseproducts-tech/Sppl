'use client';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ScrollReveal from '@/components/scroll-reveal';
import { useCreateContactForm } from '@/hooks/use-queries';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required').max(20, 'Phone too long'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject too long'),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(2000, 'Message too long'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPageContent() {
  const searchParams = useSearchParams();
  const messageParam = searchParams.get('message') || '';
  const createContactForm = useCreateContactForm();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: messageParam,
    },
  });

  useEffect(() => {
    if (messageParam) {
      form.setValue('message', messageParam);
    }
  }, [messageParam, form]);

  const onSubmit = (data: ContactFormData) => {
    createContactForm.mutate(data, {
      onSuccess: () => {
        form.reset({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      },
    });
  };

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
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        {...form.register('name')}
                        className="w-full px-4 py-2 bg-card border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your Name"
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        {...form.register('email')}
                        className="w-full px-4 py-2 bg-card border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your Email"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      {...form.register('phone')}
                      className="w-full px-4 py-2 bg-card border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Phone Number"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject">
                      Subject <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="subject"
                      {...form.register('subject')}
                      className="w-full px-4 py-2 bg-card border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Subject"
                    />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      {...form.register('message')}
                      rows={5}
                      className="w-full px-4 py-2 bg-card border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Message"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={createContactForm.isPending}
                  >
                    {createContactForm.isPending
                      ? 'Sending...'
                      : 'Send Message'}
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
