"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import LoadingSpinner from "./loading-spinner"

// Dynamically import the ProductShowcase component with no SSR
const ProductShowcase = dynamic(() => import("./product-showcase"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

export default function ProductShowcaseWrapper() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-20 bg-card flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      }
    >
      <ProductShowcase />
    </Suspense>
  )
}
