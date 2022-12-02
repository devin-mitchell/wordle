import '../index.css'

export type Guess = { char: string, color: string}[] | undefined

type Props = {
  guess?: Guess
  currentGuess?: string
}

export default function Row({currentGuess, guess}: Props) {
  
  if (guess) {
    return (
      <div className="row past">
        {guess.map((letter, index) => {
          return (
            <div key={index}className={letter.color}>{letter.char}</div>
            )
        })}
      </div>
    )
  }

  if (currentGuess) {
    const letters = currentGuess.split('')

    return (
      <div className="row current" >
        <>
          {letters.map((letter, index) => {
            return (
              <div key={index} className="filled">
                {letter}
              </div>
            )
          })}
          {[...Array(5 - letters.length)].map((_, index) => {
            return (
              <div key={index}></div>
            )
          })}
        </>
      </div>
    )
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
