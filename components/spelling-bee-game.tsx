"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Volume2, Sparkles } from "lucide-react"

// Extensive word list combining various difficulty levels and subjects
const wordList = [
  // Elementary level
  { word: "because", definition: "For the reason that; due to the fact that" },
  { word: "friend", definition: "A person whom one knows and with whom one has a bond of mutual affection" },
  { word: "people", definition: "Human beings in general or considered collectively" },
  { word: "school", definition: "An institution for educating children" },
  { word: "should", definition: "Used to indicate obligation, duty, or correctness" },
  { word: "would", definition: "Past tense of will, indicating possibility or intention" },
  { word: "could", definition: "Past tense of can, indicating possibility or ability" },
  { word: "their", definition: "Belonging to or associated with people previously mentioned" },
  { word: "there", definition: "In, at, or to that place or position" },
  { word: "they're", definition: "Contraction of 'they are'" },
  { word: "where", definition: "In or to what place or position" },
  { word: "wear", definition: "To have on one's body or a part of one's body as clothing" },
  { word: "weather", definition: "The state of the atmosphere at a place and time" },
  { word: "whether", definition: "Expressing a doubt or choice between alternatives" },

  // Intermediate level
  { word: "accommodate", definition: "To provide lodging or sufficient space for" },
  { word: "necessary", definition: "Being essential, indispensable, or requisite" },
  { word: "occurrence", definition: "The action, fact, or instance of occurring" },
  { word: "possession", definition: "The act of having or taking into control" },
  { word: "separate", definition: "To set or keep apart; to disconnect or divide" },
  { word: "definitely", definition: "Without doubt; clearly and unambiguously" },
  { word: "embarrass", definition: "To cause to feel self-conscious or ill at ease" },
  { word: "conscience", definition: "The inner sense of what is right or wrong" },
  { word: "rhythm", definition: "A strong, regular, repeated pattern of movement or sound" },
  {
    word: "privilege",
    definition: "A special right, advantage, or immunity granted or available only to a particular person or group",
  },
  { word: "receive", definition: "To be given, presented with, or paid something" },
  { word: "believe", definition: "To accept that something is true, especially without proof" },
  { word: "achieve", definition: "To successfully bring about or reach by effort, skill, or courage" },
  { word: "ceiling", definition: "The upper interior surface of a room" },

  // Advanced level
  { word: "acquiesce", definition: "To accept something reluctantly but without protest" },
  { word: "belligerent", definition: "Hostile and aggressive; ready to fight" },
  { word: "cacophony", definition: "A harsh, discordant mixture of sounds" },
  { word: "desiccate", definition: "To remove moisture from; to dry thoroughly" },
  { word: "ephemeral", definition: "Lasting for a very short time" },
  { word: "facetious", definition: "Treating serious issues with deliberately inappropriate humor" },
  { word: "garrulous", definition: "Excessively talkative, especially on trivial matters" },
  { word: "hegemony", definition: "Leadership or dominance, especially by one country or social group" },
  { word: "idiosyncrasy", definition: "A distinctive or peculiar feature or characteristic of a person or thing" },
  {
    word: "juxtaposition",
    definition: "The fact of two things being seen or placed close together with contrasting effect",
  },
  { word: "kaleidoscope", definition: "A constantly changing pattern or sequence of elements" },
  { word: "loquacious", definition: "Tending to talk a great deal; garrulous" },
  { word: "mellifluous", definition: "Sweet or musical; pleasant to hear" },
  { word: "nefarious", definition: "Wicked or criminal" },

  // Challenging level
  { word: "antediluvian", definition: "Extremely old-fashioned or outdated; from before the biblical flood" },
  { word: "blandishment", definition: "Flattery or coaxing designed to persuade someone to do something" },
  {
    word: "circumlocution",
    definition: "The use of many words where fewer would do, especially in a deliberate attempt to be vague or evasive",
  },
  { word: "deleterious", definition: "Causing harm or damage, often in a subtle or unexpected way" },
  { word: "ebullient", definition: "Cheerful and full of energy; exuberant" },
  { word: "fecundity", definition: "The ability to produce many new ideas, works, or offspring" },
  { word: "grandiloquent", definition: "Using language that is pompous or extravagant in style or manner" },
  { word: "hagiography", definition: "A biography that treats its subject with undue reverence or admiration" },
  { word: "ineffable", definition: "Too great or extreme to be expressed or described in words" },
  { word: "obfuscate", definition: "To make obscure, unclear, or unintelligible" },
  { word: "perspicacious", definition: "Having a ready insight into and understanding of things" },
  { word: "quintessential", definition: "Representing the most perfect or typical example of a quality or class" },

  // Science terms
  {
    word: "photosynthesis",
    definition: "The process by which green plants use sunlight to synthesize foods from carbon dioxide and water",
  },
  { word: "mitochondria", definition: "Organelles found in cells that are the sites of energy production" },
  {
    word: "chromosome",
    definition: "A threadlike structure of nucleic acids and protein carrying genetic information",
  },
  { word: "hypothesis", definition: "A proposed explanation for a phenomenon, made on the basis of limited evidence" },
  { word: "equilibrium", definition: "A state in which opposing forces or influences are balanced" },
  {
    word: "catalyst",
    definition:
      "A substance that increases the rate of a chemical reaction without itself undergoing any permanent change",
  },
  {
    word: "osmosis",
    definition:
      "The process by which molecules pass through a semipermeable membrane from a less concentrated solution to a more concentrated one",
  },
  {
    word: "quantum",
    definition:
      "A discrete quantity of energy proportional in magnitude to the frequency of the radiation it represents",
  },
  {
    word: "thermodynamics",
    definition: "The branch of physics concerned with heat and temperature and their relation to energy and work",
  },
  { word: "biodiversity", definition: "The variety of plant and animal life in the world or in a particular habitat" },

  // Literature terms
  { word: "allegory", definition: "A story, poem, or picture that can be interpreted to reveal a hidden meaning" },
  {
    word: "metaphor",
    definition:
      "A figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable",
  },
  {
    word: "protagonist",
    definition: "The leading character or one of the major characters in a play, film, novel, etc.",
  },
  {
    word: "soliloquy",
    definition: "An act of speaking one's thoughts aloud when by oneself or regardless of any hearers",
  },
  {
    word: "denouement",
    definition: "The final part of a play, movie, or narrative in which the strands of the plot are drawn together",
  },
  { word: "onomatopoeia", definition: "The formation of a word from a sound associated with what is named" },
  { word: "hyperbole", definition: "Exaggerated statements or claims not meant to be taken literally" },
  { word: "bildungsroman", definition: "A novel dealing with one person's formative years or spiritual education" },
  { word: "verisimilitude", definition: "The appearance of being true or real in fiction or art" },

  // Commonly misspelled words
  { word: "acceptable", definition: "Able to be agreed on; suitable" },
  { word: "accidentally", definition: "By chance; inadvertently" },
  { word: "accommodate", definition: "To provide lodging or sufficient space for" },
  { word: "acquire", definition: "To buy or obtain for oneself" },
  { word: "amateur", definition: "A person who engages in a pursuit on an unpaid basis" },
  { word: "apparent", definition: "Clearly visible or understood; obvious" },
  { word: "argument", definition: "An exchange of diverging or opposite views" },
  { word: "atheist", definition: "A person who disbelieves or lacks belief in the existence of God or gods" },
  { word: "bizarre", definition: "Very strange or unusual" },
  {
    word: "calendar",
    definition: "A chart or series of pages showing the days, weeks, and months of a particular year",
  },
  { word: "cemetery", definition: "A burial ground; a graveyard" },
  { word: "colleague", definition: "A person with whom one works in a profession or business" },
  { word: "committed", definition: "Pledged or obligated to a particular cause, action, or attitude" },
  { word: "conscience", definition: "A person's moral sense of right and wrong" },
  { word: "conscious", definition: "Aware of and responding to one's surroundings" },
  { word: "consensus", definition: "General agreement" },
  { word: "daiquiri", definition: "A cocktail containing rum, lime juice, and sugar" },
  { word: "definite", definition: "Clearly stated or decided; not vague or doubtful" },
  { word: "discipline", definition: "The practice of training people to obey rules or a code of behavior" },
  { word: "drunkenness", definition: "The state of being drunk" },
  { word: "dumbbell", definition: "A short bar with weights at each end, used for exercise" },
  { word: "embarrass", definition: "To cause someone to feel awkward, self-conscious, or ashamed" },
  { word: "equipment", definition: "The necessary items for a particular purpose" },
  { word: "exhilarate", definition: "To make someone feel very happy, animated, or elated" },
  { word: "exceed", definition: "To be greater than or superior to" },
  { word: "existence", definition: "The fact or state of living or having objective reality" },
  { word: "experience", definition: "Practical contact with and observation of facts or events" },
  { word: "fiery", definition: "Consisting of fire or burning strongly and brightly" },
  { word: "foreign", definition: "Of, from, in, or characteristic of a country or language other than one's own" },
  {
    word: "gauge",
    definition: "An instrument that measures and gives a visual display of the amount, level, or contents of something",
  },
]

export default function SpellingBeeGame() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<null | { correct: boolean; message: string }>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [shuffledWords, setShuffledWords] = useState([...wordList])
  const [totalWords, setTotalWords] = useState(10) // Default to 10 words per session
  const [gameWords, setGameWords] = useState<typeof wordList>([])

  // Initialize game with random selection of words
  useEffect(() => {
    startNewGame()
  }, [])

  // Start a new game with random words
  const startNewGame = () => {
    // Shuffle the entire word list
    const allShuffled = [...wordList].sort(() => Math.random() - 0.5)

    // Take the first 10 words for this game session
    const selectedWords = allShuffled.slice(0, 10)

    setGameWords(selectedWords)
    setTotalWords(selectedWords.length)
    setCurrentWordIndex(0)
    setScore(0)
    setUserInput("")
    setFeedback(null)
    setIsChecked(false)
  }

  const currentWord = gameWords[currentWordIndex]

  const speakWord = () => {
    if (typeof window !== "undefined" && window.speechSynthesis && currentWord) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word)
      utterance.rate = 0.9 // Slightly slower than default
      window.speechSynthesis.speak(utterance)
    }
  }

  const checkSpelling = () => {
    if (!userInput.trim() || !currentWord) return

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
    if (currentWordIndex < gameWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      setUserInput("")
      setFeedback(null)
      setIsChecked(false)
    } else {
      // Game over - all words completed
      setFeedback({
        correct: true,
        message: `Game completed! Your final score is ${score} out of ${gameWords.length}.`,
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <CardTitle className="text-xl text-amber-900">Spell the Word</CardTitle>
            <CardDescription className="text-amber-700">
              Word {currentWordIndex + 1} of {totalWords}
            </CardDescription>
          </div>
          <div className="bg-amber-100 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span className="font-medium text-amber-900">Score: {score}</span>
          </div>
        </div>
      </CardHeader>

      {currentWord && (
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
                feedback.correct
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
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
      )}

      <CardFooter className="bg-gradient-to-b from-amber-50 to-amber-100 border-t border-amber-200 p-4 flex flex-col sm:flex-row gap-2">
        {currentWordIndex === gameWords.length - 1 && isChecked ? (
          <Button onClick={startNewGame} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
            Play Again
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
            {!isChecked ? "Check Spelling" : "Next Word"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
