import { useState } from "react"

type Letter = {
  char: string
  color: string
}

type Solution = string | null

const useWordle = (solution: String) => {
  const [turn, setTurn] = useState<number>(0)
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [guesses, setGuesses] = useState([...Array(6)])
  const [history, setHistory] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [usedKeys, setUsedKeys] = useState<{[key: string]: string}>({})

  const formatGuess = () => {
    const solutionArr: Solution[] = Array.from(solution)
    const formattedGuess: string | Letter[] = Array.from(currentGuess).map(letter => {
      return(
        {char: letter, color: 'gray'}
      )
    })

    
    formattedGuess.forEach((char, i) => {
      if (char.char === solutionArr[i]) {
        formattedGuess[i].color = 'green'
        solutionArr[i] = null
      } else if (solutionArr.includes(char.char) && char.color !== 'green') {
        formattedGuess[i].color = 'yellow'
        solutionArr[solutionArr.indexOf(char.char)] = null
      }
    })

    return formattedGuess
  }

  const addNewGuess = (formattedGuess: Letter[]) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }

    setGuesses((prevGuesses) => {
      const newGuesses = Array.from(prevGuesses)
      newGuesses[turn] = formattedGuess

      return newGuesses
    })

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess]
    })

    setTurn((prevTurn) => {
      return prevTurn + 1
    })

    setUsedKeys((prevKeys) => {
      const newKeys: {[key: string]: string} = {...prevKeys}

      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.char]

        if (letter.color === "green") {
          newKeys[letter.char] = "green"
          return
        } 
        if (letter.color === "yellow" && currentColor !== "green") {
          newKeys[letter.char] = "yellow"
          return
        }
        if (letter.color === "gray" && currentColor !== "green" && currentColor !== "yellow") {
          newKeys[letter.char] = "gray"
          return
        }
      })
        return newKeys
    })

    setCurrentGuess('')
  }

  const handleKeyUp = ({key}: KeyboardEvent): void => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("you used all your guesses")
        return
      }

      if (history.includes(currentGuess)) {
        console.log("you've already tried that word")
        return
      }

      if (currentGuess.length !== 5) {
        console.log("word must be five characters long")
        return
      }

      const formatted = formatGuess()
      addNewGuess(formatted)
    }

    if (key === "Backspace") {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key
        })
      }
    } 
  }

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    handleKeyUp,
    usedKeys
  }
}

export default useWordle
