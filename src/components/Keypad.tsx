import React, { useEffect, useState } from 'react'

import '../index.css'

type Letter = {
  key: string
}

type Props = {
  usedKeys: {[key: string]: string} 
}

export default function Keypad({usedKeys}: Props) {
  const [letters, setLetters] = useState<Letter[] | null>(null)

  useEffect(() => {
    fetch("http://localhost:3001/letters")
      .then(res => res.json())
      .then(json => {
        setLetters(json)
      })
  }, [setLetters])

  return (
    <div className="keypad">
      {letters !== null && letters.map(letter => {
        const color = usedKeys[letter.key]

        return (
          <div key={letter.key} className={color}>{letter.key}</div>
        )
      })}
    </div>
  )
}
