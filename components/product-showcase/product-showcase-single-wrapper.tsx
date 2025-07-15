"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import LoadingSpinner from "./loading-spinner"
import type { products } from "@/lib/constants"

// Dynamically import the ProductShowcase component with no SSR
const ProductShowcaseSingle = dynamic(() => import("./product-showcase-single"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

interface ProductShowcaseSingleWrapperProps {
  product: (typeof products)[0]
}

export default function ProductShowcaseSingleWrapper({ product }: ProductShowcaseSingleWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full py-20 bg-card flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      }
    >
      <ProductShowcaseSingle product={product} />
    </Suspense>
  )
}
