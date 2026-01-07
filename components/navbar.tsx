'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Define navigation structure with dropdowns
const navItems = [
  {
    name: 'Home',
    href: '/',
    dropdown: true,
    items: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Life at SPPL', href: '/life-at-sppl' },
      { name: 'Gallery', href: '/gallery' },
    ],
  },
  {
    name: 'Products',
    href: '/products',
    dropdown: true,
    items: [
      { name: 'Our Solutions', href: '/solutions' },
      { name: 'Principal Products', href: '/principal-products' },
      { name: 'System Integrator', href: '/system-integrator' },
    ],
  },
  {
    name: 'Our Approach',
    href: '/our-approach',
    dropdown: false,
  },
  {
    name: 'Testimonials',
    href: '/collaborators',
    dropdown: false,
  },
  // {
  //   name: 'Application',
  //   href: '#',
  //   dropdown: false,
  // },
  // {
  //   name: 'Publication',
  //   href: '#',
  //   dropdown: false,
  // },
  {
    name: 'Contact Us',
    href: '/contact',
    dropdown: false,
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isMobile = useMobile();
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!isMobile && activeDropdown) {
        const dropdownElement = dropdownRefs.current[activeDropdown];
        if (
          dropdownElement &&
          !dropdownElement.contains(event.target as Node)
        ) {
          setActiveDropdown(null);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown, isMobile]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-secondary',
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-md py-2'
          : 'bg-background/70 backdrop-blur-sm py-4',
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo Area with more visible background */}
          <Link href="/" className="flex items-center mt-2">
            <div className="relative w-16 h-16 mr-4 bg-white rounded-full p-2 shadow-md">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Disc%20shaped_without%20background%20%281%29-OQoxElFApTHusoL6AA21rF47oxtJzy.png"
                alt="Spécialisé Products Logo"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-primary uppercase">
                Spécialisé Products
              </span>
              <span className="text-sm text-foreground/80 font-medium">
                Customized Solutions Company
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                ref={(el) => {
                  dropdownRefs.current[item.name] = el;
                }}
              >
                {item.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center font-medium hover:text-secondary transition-colors"
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'ml-1 h-4 w-4 transition-transform',
                        activeDropdown === item.name ? 'rotate-180' : '',
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="font-medium hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Desktop Dropdown */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-card rounded-md shadow-lg overflow-hidden z-20"
                      >
                        <div className="py-1">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm hover:bg-secondary hover:text-white transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-secondary" />
            ) : (
              <Menu className="h-6 w-6 text-secondary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-card/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <div key={item.name} className="py-2">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center justify-between w-full py-2 font-medium text-foreground hover:text-secondary transition-colors"
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform',
                              activeDropdown === item.name ? 'rotate-180' : '',
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 border-l-2 border-primary/30 ml-2 mt-2"
                            >
                              {item.items?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block py-2 text-muted-foreground hover:text-secondary transition-colors"
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-2 font-medium text-foreground hover:text-secondary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Button
                  asChild
                  className="w-full mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
