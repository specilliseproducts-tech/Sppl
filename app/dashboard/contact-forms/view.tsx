'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Mail, Phone, Calendar, User, MessageSquare } from 'lucide-react';

type ContactForm = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

interface ViewContactFormProps {
  data: ContactForm;
  children: React.ReactNode;
}

export function ViewContactForm({ data, children }: ViewContactFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact Form Details</DialogTitle>
          <DialogDescription>
            View the complete contact form submission
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Name</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">{data.name}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">{data.email}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Phone</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">{data.phone}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Date Submitted</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                {format(new Date(data.createdAt), 'MMMM d, yyyy - h:mm a')}
              </p>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Subject</span>
            </div>
            <div className="ml-6">
              <Badge variant="outline">{data.subject}</Badge>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <span className="text-sm font-medium">Message</span>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{data.message}</p>
            </div>
          </div>

          {/* Quick Actions */}
          {/* <div className="flex gap-2 pt-4 border-t">
            <a
              href={`mailto:${data.email}?subject=Re: ${data.subject}`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              <Mail className="h-4 w-4 mr-2" />
              Reply via Email
            </a>
            <a
              href={`tel:${data.phone}`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call
            </a>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
