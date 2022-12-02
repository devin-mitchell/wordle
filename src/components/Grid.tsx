import Row, { Guess } from "./Row"

type Props = {
  currentGuess: string
  guesses: Guess[] 
  turn: number
}

export default function Grid({ currentGuess, guesses, turn }: Props) {
  return (
    <div>
      {guesses.map((guess, index) => {
          if (turn === index) {
            return <Row key={index} currentGuess={currentGuess} />
          }

          return <Row key={index} guess={guess} />
      })}
    </div>
  )
}
