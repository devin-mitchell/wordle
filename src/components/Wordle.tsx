import { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

type Props = {
  solution: string
}

export default function Wordle({ solution }: Props) {
  const { currentGuess, handleKeyUp, guesses, turn, usedKeys, isCorrect } = useWordle(solution)
  const [showModal, setShowModal] = useState<boolean>(false)
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    if (isCorrect) {
      window.removeEventListener('keyup', handleKeyUp)
      setTimeout(() => setShowModal(true), 2000)
    }

    if (turn > 5) {
      window.removeEventListener('keyup', handleKeyUp)
      setTimeout(() => setShowModal(true), 2000)
    }
    
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp, isCorrect, turn])

  return (
    <>
      {showModal && <Modal turn={turn} isCorrect={isCorrect} solution={solution}/>}
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      <div>{solution}</div>
    </>
  )
}
