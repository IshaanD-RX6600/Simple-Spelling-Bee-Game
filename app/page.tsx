import SpellingBeeGame from "@/components/spelling-bee-game"
import { Honeycomb } from "@/components/honeycomb-logo"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-amber-50">
      <div className="w-full max-w-md text-center">
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
