import { useState } from 'react'
import './App.css'

function App() {
  const [anecdotes, setAnecdotes] = useState([
    {
      anectode: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      anectode: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      anectode: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      anectode: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      anectode: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      anectode: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      anectode: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      votes: 0
    },
    {
      anectode: 'The only way to go fast, is to go well.',
      votes: 0
    }
  ])
   
  const [selected, setSelected] = useState(0)
  const setRandomAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const voteAnecdote = () => {
    const newAnecs = [...anecdotes]
    newAnecs[selected].votes++
    setAnecdotes(newAnecs)
  }
  const mostVotedAnecdote = [...anecdotes].sort((a1, a2) => a2.votes - a1.votes)[0]

  return (
    <div>
      <h2>Random anectode.</h2>
      <Anecdote anectode={anecdotes[selected]}/>
      <Button handleClick={voteAnecdote} text="Vote"/>
      <Button handleClick={setRandomAnecdote} text="Next"/>
      <h2>Most voted anectode.</h2>
      <Anecdote anectode={mostVotedAnecdote}/>
    </div>
  )
}

function Anecdote({anectode}) {
  return (
    <>
      <p>{anectode.anectode}</p>
      <p>Votes: {anectode.votes}</p>
    </>
  )
}

function Button({handleClick, text}) {
  return <button onClick={handleClick}>{text}</button>
}

export default App
