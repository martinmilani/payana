'use client'
import React, { useState } from 'react'
import { preguntas } from '../data.json'

interface Question {
  id: number;
  texto: string;
}

interface Answer extends Question {
  valoracion: 1 | 2 | 3 | 4 | 5
}

const questions: Question[] = preguntas

function Rating ({value, onChange, isReadOnly}:{
  value:Answer['valoracion'],
  onChange: (value:Answer['valoracion']) => void,
  isReadOnly?: never
} | {
  value:Answer['valoracion'],
  isReadOnly: boolean,
  onChange?: never
}) {
  const [hoverValue, setHoverValue] = useState<Answer['valoracion']>(value)

  console.log('★☆')

  return (
    <div
      className='text-2xl text-yellow-300'
      onMouseLeave={() => setHoverValue(value)}
    >
      {'★'
        .repeat(hoverValue || value)
        .padEnd(5, '☆')
        .split('')
        .map((elem, index) =>
          <span
            key={index}
            className={!isReadOnly ? 'cursor-pointer' : ''}
            onClick={() => !isReadOnly && onChange?.((index + 1) as Answer['valoracion'])}
            onMouseOver={() => !isReadOnly && setHoverValue((index + 1) as Answer['valoracion'])}
          >
            {elem}
          </span>
        )}
    </div>
  )
}

export default function Home () {
  const [answers, setAnswers] = useState<Answer[]>([])
  const currentQuestion = questions[answers.length]

  function handleRate (rating: Answer['valoracion']) {
    setAnswers((answers) =>
      answers.concat({
        ...currentQuestion,
        valoracion: rating
      }))
  }

  if (!currentQuestion) {
    return (
      <div className='py-8 w-[550px] bg-slate-950 rounded-xl'>
        <ul className=''>
          {answers.map(answer => (
            <li
              className='flex justify-between px-8 py-2'
              key={answer.id}
            >{answer.texto} <Rating
              isReadOnly
              value={answer.valoracion}
                            />
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <div className='h-64 w-96 bg-slate-950 rounded-xl text-center p-8'>
      <h1 className='h-1/4 flex items-center justify-center'>{currentQuestion.texto}</h1>
      <div className='h-3/4 flex items-center justify-center'>
        <Rating value={1} onChange={handleRate} />
      </div>
    </div>
  )
}
