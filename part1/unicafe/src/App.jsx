import { useState } from 'react'

const Heading = ({ title }) => {
    return (
        <>
            <h1>{title}</h1>
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


const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}


const Statistics = ({counts: [ good, neutral, bad ]}) => {
  let all = good + neutral + bad

  if (all > 0) {
    let total_score = good - bad
    let avg = total_score / all
    
    let positive = (good * 100) / all
    
    return (
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={avg} />
          <StatisticLine text={"positive"} value={positive} />
        </tbody>
      </table>
    )
  }

  return (
    <>
      <p>No feedback given</p>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <>
      <Heading title={"give feedback"} />
      <Button handleClick={handleGood} text={"good"} />
      <Button handleClick={handleNeutral} text={"neutral"} />
      <Button handleClick={handleBad} text={"bad"} />
      <Heading title={"statistics"} />
      <Statistics counts={[good, neutral, bad]} />
    </>
  )
}

export default App