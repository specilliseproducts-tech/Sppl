'use client';

import {
  Building2,
  Users,
  Receipt,
  Settings,
  Home,
  Image,
  Phone,
  Briefcase,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Products',
    url: '/dashboard/products',
    icon: Briefcase,
  },
  {
    title: 'Solutions',
    url: '/dashboard/solutions',
    icon: Settings,
  },
  {
    title: 'Principal Products',
    url: '/dashboard/principal-products',
    icon: Briefcase,
  },
  {
    title: 'System Integrators',
    url: '/dashboard/system-integrators',
    icon: Users,
  },
  {
    title: 'Gallery',
    url: '/dashboard/gallery',
    icon: Image,
  },
  {
    title: 'Team',
    url: '/dashboard/team',
    icon: Users,
  },
  {
    title: 'Collaborators',
    url: '/dashboard/collaborators',
    icon: Users,
  },
  {
    title: 'Contact Form',
    url: '/dashboard/contact-form',
    icon: Phone,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-gray-900 text-white w-64 h-screen">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold px-4 py-6 border-b border-gray-700">
            Admin Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 mt-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={`flex items-center gap-4 px-4 py-3 rounded-md ${
                      pathname === item.url
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-800 hover:text-primary'
                    }`}
                  >
                    <Link href={item.url} className="flex items-center gap-4">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
