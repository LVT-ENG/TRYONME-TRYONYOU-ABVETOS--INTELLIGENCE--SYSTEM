import React from 'react'

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-tryonyou-blue/30 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-tryonyou-blue rounded-full animate-spin"></div>
      </div>
    </div>
  )
}
