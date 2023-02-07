import { useEffect, useState } from "react";

type Letter = {
  key: string;
};

type Props = {
  usedKeys: { [key: string]: string };
};

const LETTERS = [
  { key: "a" },
  { key: "b" },
  { key: "c" },
  { key: "d" },
  { key: "e" },
  { key: "f" },
  { key: "g" },
  { key: "h" },
  { key: "i" },
  { key: "j" },
  { key: "k" },
  { key: "l" },
  { key: "m" },
  { key: "n" },
  { key: "o" },
  { key: "p" },
  { key: "q" },
  { key: "r" },
  { key: "s" },
  { key: "t" },
  { key: "u" },
  { key: "v" },
  { key: "w" },
  { key: "x" },
  { key: "y" },
  { key: "z" },
];

export default function Keypad({ usedKeys }: Props) {
  const [letters, setLetters] = useState<Letter[] | null>(null);

  useEffect(() => {
    setLetters(LETTERS);
  }, [setLetters]);

  return (
    <div className="keypad">
      {letters !== null &&
        letters.map((letter) => {
          const color = usedKeys[letter.key];

          return (
            <div key={letter.key} className={color}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
}
