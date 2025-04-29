import SpellingBeeGame from "@/components/spelling-bee-game"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-amber-50">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2 text-amber-900">Spelling Bee Practice</h1>
        <p className="text-amber-700 mb-8">Test your spelling skills!</p>
        <SpellingBeeGame />
      </div>
    </main>
  )
}
