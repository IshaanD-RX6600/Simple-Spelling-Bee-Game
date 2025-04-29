"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Volume2, Sparkles } from "lucide-react"

// Sample word list with definitions
const wordList = [
  {
    word: "accommodate",
    definition: "To provide lodging or sufficient space for",
  },
  {
    word: "necessary",
    definition: "Being essential, indispensable, or requisite",
  },
  {
    word: "occurrence",
    definition: "The action, fact, or instance of occurring",
  },
  {
    word: "possession",
    definition: "The act of having or taking into control",
  },
  {
    word: "separate",
    definition: "To set or keep apart; to disconnect or divide",
  },
  {
    word: "definitely",
    definition: "Without doubt; clearly and unambiguously",
  },
  {
    word: "embarrass",
    definition: "To cause to feel self-conscious or ill at ease",
  },
  {
    word: "conscience",
    definition: "The inner sense of what is right or wrong",
  },
  {
    word: "rhythm",
    definition: "A strong, regular, repeated pattern of movement or sound",
  },
  {
    word: "privilege",
    definition: "A special right, advantage, or immunity granted or available only to a particular person or group",
  },
]

export default function SpellingBeeGame() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<null | { correct: boolean; message: string }>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [shuffledWords, setShuffledWords] = useState([...wordList])

  // Shuffle words on component mount
  useEffect(() => {
    setShuffledWords([...wordList].sort(() => Math.random() - 0.5))
  }, [])

  const currentWord = shuffledWords[currentWordIndex]

  const speakWord = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word)
      utterance.rate = 0.9 // Slightly slower than default
      window.speechSynthesis.speak(utterance)
    }
  }

  const checkSpelling = () => {
    if (!userInput.trim()) return

    const isCorrect = userInput.trim().toLowerCase() === currentWord.word.toLowerCase()

    if (isCorrect) {
      setFeedback({
        correct: true,
        message: `Correct! "${currentWord.word}" is spelled correctly.`,
      })
      setScore(score + 1)
      // Speak the word after a short delay
      setTimeout(speakWord, 500)
    } else {
      setFeedback({
        correct: false,
        message: `Incorrect. The correct spelling is "${currentWord.word}".`,
      })
      // Speak the word after a short delay
      setTimeout(speakWord, 500)
    }

    setIsChecked(true)
  }

  const nextWord = () => {
    if (currentWordIndex < shuffledWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      setUserInput("")
      setFeedback(null)
      setIsChecked(false)
    } else {
      // Game over - all words completed
      setFeedback({
        correct: true,
        message: `Game completed! Your final score is ${score} out of ${shuffledWords.length}.`,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isChecked) {
      checkSpelling()
    } else {
      nextWord()
    }
  }

  return (
    <Card className="w-full border-amber-200 bg-white shadow-lg overflow-hidden">
      <div className="bg-amber-400 h-2"></div>
      <CardHeader className="bg-gradient-to-b from-amber-100 to-amber-50 border-b border-amber-100">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl text-amber-900">Spell the Word</CardTitle>
            <CardDescription className="text-amber-700">
              Word {currentWordIndex + 1} of {shuffledWords.length}
            </CardDescription>
          </div>
          <div className="bg-amber-100 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span className="font-medium text-amber-900">Score: {score}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-6">
        <div className="p-5 bg-amber-50 rounded-lg border border-amber-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-100 rounded-full translate-y-8 -translate-x-8 opacity-50"></div>
          <h3 className="font-medium mb-3 text-amber-900 relative z-10">Definition:</h3>
          <p className="italic text-amber-800 relative z-10">{currentWord.definition}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 flex items-center gap-1 bg-white border-amber-200 text-amber-700 hover:bg-amber-100 hover:text-amber-900"
            onClick={speakWord}
            type="button"
          >
            <Volume2 className="h-4 w-4" />
            <span>Hear Word</span>
          </Button>
        </div>

        {feedback && (
          <Alert
            className={
              feedback.correct ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
            }
          >
            <div className="flex items-center gap-2">
              {feedback.correct ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <AlertDescription>{feedback.message}</AlertDescription>
            </div>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="spelling-input" className="text-sm font-medium text-amber-900">
              Your answer:
            </label>
            <Input
              id="spelling-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type the word here..."
              disabled={isChecked}
              autoComplete="off"
              className="w-full border-amber-200 focus-visible:ring-amber-400"
            />
          </div>
        </form>
      </CardContent>

      <CardFooter className="bg-gradient-to-b from-amber-50 to-amber-100 border-t border-amber-200 p-4">
        <Button
          onClick={handleSubmit}
          disabled={currentWordIndex === shuffledWords.length && isChecked}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white"
        >
          {!isChecked ? "Check Spelling" : currentWordIndex < shuffledWords.length - 1 ? "Next Word" : "Finish Game"}
        </Button>
      </CardFooter>
    </Card>
  )
}
