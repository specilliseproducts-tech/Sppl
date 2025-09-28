import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card text-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="relative w-12 h-12 mr-3 bg-background rounded-full p-1">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Disc%20shaped_without%20background%20%281%29-OQoxElFApTHusoL6AA21rF47oxtJzy.png"
                  alt="Spécialisé Products Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-primary">Spécialisé Products</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Spontaneous, Pre-emptive, Creative Solutions for your Demanding Applications.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/collaborators" className="text-muted-foreground hover:text-primary transition-colors">
                  Collaborators
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products/microchannel-fabrication-machine"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Microchannel Fabrication
                </Link>
              </li>
              <li>
                <Link
                  href="/products/alestm-system"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ALESTM System
                </Link>
              </li>
              <li>
                <Link
                  href="/products/laser-marking-cutting-machine"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Laser Marking & Cutting
                </Link>
              </li>
              <li>
                <Link
                  href="/products/3d-fff-fdm-printer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  3D Printers
                </Link>
              </li>
              <li>
                <Link
                  href="/products/free-space-optics-communications"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Free Space Optics
                </Link>
              </li>
              <li>
                <Link
                  href="/products/drop-on-demand-3d-printer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Drop on Demand 3D Printer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-secondary mr-3 shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  706 Kamdhenu Commerz, Plot # 2, Sector 14, Kharghar, Navi Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-secondary mr-3 shrink-0" />
                <span className="text-muted-foreground">+91-9323192750</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-secondary mr-3 shrink-0" />
                <span className="text-muted-foreground">info@specialiseproducts.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted pt-8">
          <p className="text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Spécialisé Products - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
