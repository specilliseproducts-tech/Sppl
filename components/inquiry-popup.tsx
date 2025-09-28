'use client';
import { useState, useEffect } from 'react';
import { X, Mail, Phone, User, Package, Briefcase } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products } from '@/lib/constants';

const inquiryFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  contactNumber: z.string().min(1, 'Contact number is required').max(20, 'Contact number too long'),
  productOfInterest: z.string().min(1, 'Please select a product'),
  application: z.string().min(1, 'Please select an application'),
  additionalInfo: z.string().max(1000, 'Additional information too long').optional(),
});

type InquiryFormData = z.infer<typeof inquiryFormSchema>;

interface InquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InquiryFormData) => void;
}

// Application options based on the products
const applicationOptions = [
  'Research & Education',
  'Medical & Healthcare',
  'Manufacturing',
  'Aerospace & Defense',
  'Telecom',
  'Oil & Gas',
  'Petrochemical',
  'Engineering',
  'Laboratory',
  'Quality Control',
  'Prototype Development',
  'Field Operations',
  'Industrial Automation',
  'Material Science',
  'Biomedical Research',
  'Thermal Analysis',
  'Microfabrication',
  'Precision Engineering',
  'Other',
];

export default function InquiryPopup({ isOpen, onClose, onSubmit }: InquiryPopupProps) {
  console.log('InquiryPopup - isOpen:', isOpen); // Debug log
  
  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: '',
      email: '',
      contactNumber: '',
      productOfInterest: '',
      application: '',
      additionalInfo: '',
    },
  });

  const handleSubmit = (data: InquiryFormData) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-muted">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">Get Product Information</h2>
              <p className="text-muted-foreground">Tell us about your requirements</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Name <span className="text-destructive">*</span></span>
              </Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder="Your full name"
                className="mt-1"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email <span className="text-destructive">*</span></span>
              </Label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder="your.email@example.com"
                className="mt-1"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <Label htmlFor="contactNumber" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Contact Number <span className="text-destructive">*</span></span>
            </Label>
            <Input
              id="contactNumber"
              type="tel"
              {...form.register('contactNumber')}
              placeholder="+91-XXXXXXXXXX"
              className="mt-1"
            />
            {form.formState.errors.contactNumber && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.contactNumber.message}
              </p>
            )}
          </div>

          {/* Product of Interest */}
          <div>
            <Label className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Product of Interest <span className="text-destructive">*</span></span>
            </Label>
            <Select onValueChange={(value) => form.setValue('productOfInterest', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.name}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.productOfInterest && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.productOfInterest.message}
              </p>
            )}
          </div>

          {/* Application */}
          <div>
            <Label className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Application <span className="text-destructive">*</span></span>
            </Label>
            <Select onValueChange={(value) => form.setValue('application', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select application" />
              </SelectTrigger>
              <SelectContent>
                {applicationOptions.map((application) => (
                  <SelectItem key={application} value={application}>
                    {application}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.application && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.application.message}
              </p>
            )}
          </div>

          {/* Additional Information */}
          <div>
            <Label htmlFor="additionalInfo">
              Additional Information
            </Label>
            <Textarea
              id="additionalInfo"
              {...form.register('additionalInfo')}
              rows={4}
              placeholder="Tell us more about your specific requirements, timeline, or any other details..."
              className="mt-1"
            />
            {form.formState.errors.additionalInfo && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.additionalInfo.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-muted">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="min-w-[120px]">
              Submit Inquiry
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
