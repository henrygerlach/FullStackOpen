import { useState } from 'react'


const Heading = ({ text }) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}


const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}


const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      {anecdote} {votes} votes
    </>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [idx_selected, setIdxSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [idx_most_votes, setIdxMostVotes] = useState(0)

  const handleSelectedClick = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length)
    setIdxSelected(randomNum)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[idx_selected] += 1
    setVotes(newVotes)

    const new_idx_most_votes = newVotes.indexOf(Math.max(...newVotes)) 
    setIdxMostVotes(new_idx_most_votes)
  }

  return (
    <div>
      <Heading text={"Anecdote of the day"} />
      <Anecdote anecdote={anecdotes[idx_selected]} votes={votes[idx_selected]} />
      <br></br>
      <Button handleClick={handleVoteClick} text={"vote"} />
      <Button handleClick={handleSelectedClick} text={"next anecdote"} />
      <Heading text={"Anecdote with most votes"} />
      <Anecdote anecdote={anecdotes[idx_most_votes]} votes={votes[idx_most_votes]} />
    </div>
  )
}

export default App