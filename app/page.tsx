import Link from "next/link"
import SpellingBeeGame from "@/components/spelling-bee-game"
import { Honeycomb } from "@/components/honeycomb-logo"
import { ExternalLink } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-amber-50 relative">
      <Link
        href="https://ishaan-dhiman.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 text-amber-800 hover:text-amber-600 transition-colors flex items-center gap-1 font-medium"
      >
        <span>Ishaan Dhiman</span>
        <ExternalLink className="h-4 w-4" />
      </Link>

      <div className="w-full max-w-md text-center mt-8">
        <div className="flex flex-col items-center justify-center mb-6">
          <Honeycomb className="w-24 h-24 mb-2" />
          <h1 className="text-3xl font-bold text-amber-900">spellingbee.vercel.app</h1>
          <p className="text-amber-700 mt-2">Test your spelling skills with a wide variety of words!</p>
        </div>
        <SpellingBeeGame />
      </div>
    </main>
  )
}
