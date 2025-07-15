import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Button asChild className="group">
          <Link href="/">
            Back to Home
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
