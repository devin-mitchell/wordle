type Props = {
  isCorrect: boolean
  turn: number
  solution: string
}

export default function WinningModal({ turn, isCorrect, solution}: Props) {
  return (
      <div className='modal'>
        {isCorrect && 
          <div>
            <h1>You Win!</h1>
            <p className="solution">{solution}</p>
            <p>You found the soution in {turn} guesses :)</p>
          </div>
        }
        {!isCorrect && 
          <div>
            <h1>Out of guesses</h1>
            <p className="solution">{solution}</p>
            <p>Better luck next time :)</p>
          </div>
        }
      </div>
  )
}
