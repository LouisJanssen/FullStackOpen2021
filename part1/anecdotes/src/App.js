import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => {
    return(
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const Anecdote = ({text, votes}) =>{
    return(
        <div>
            {text} <br/>
            has {votes} Votes
        </div>
    )
}

const TopAnecdote = ({anecdotes, votesArray}) => {
    const topNote = Math.max(...votesArray)
    const noteIndex = votesArray.indexOf(topNote)
    const topVote = anecdotes[noteIndex]

    return(
        <div>
            {topVote} <br/>
            With {topNote} votes !
        </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votesArray, setVotesArray] = useState(Array(anecdotes.length + 1).fill(0))

  const handleVoteClick = () => {
    const newVotesArray = [...votesArray]
    newVotesArray[selected] += 1
    setVotesArray(newVotesArray)
  }

  const handleNextClick = () => {
    const randNumber = () => Math.floor(Math.random() * anecdotes.length)
    setSelected(randNumber)
  }

  return (
    <div>
        <Header text="Anecdote of the day" />
        <Anecdote text={anecdotes[selected]} votes={votesArray[selected]} />
        <Button onClick={handleVoteClick} text="Vote"/>
        <Button onClick={handleNextClick} text="Next anecdote"/>
        <Header text="Anecdote with most votes" />
        <TopAnecdote anecdotes={anecdotes} votesArray={votesArray} />
    </div>
  )
}

export default App