import { useState } from 'react'
import './App.css'

function App() {

  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)

  return (
    <>
      <Header text="Give Feedback"/>
      <Button handleClick={() => setGoodCount(goodCount + 1) } text="Good"/>
      <Button handleClick={() => setNeutralCount(neutralCount + 1) } text="Neutral"/>
      <Button handleClick={() => setBadCount(badCount + 1) } text="Bad"/>
      <Statistics goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}/>
    </>
  )
}

function Statistics({ goodCount, neutralCount, badCount }) {
  const total = goodCount + neutralCount + badCount 
  if (total) 
    return ( 
      <>
        <Header text="Statistics"/>
        <table>
          <tbody>
            <StatisticLine text="Good Reviews" count={goodCount}/>
            <StatisticLine text="Neutral Reviews" count={neutralCount}/>
            <StatisticLine text="Bad Reviews" count={badCount}/>
            <StatisticLine text="Total" count={total}/>
            <StatisticLine text="Average" count={((goodCount - badCount) / total).toPrecision(1)}/>
            <StatisticLine text="Positive" count={((goodCount / total) * 100).toPrecision(3) + "%"}/>
          </tbody>
        </table>
      </>
    )
  else 
      return <p>No FeedBack Given</p>
}

function StatisticLine({ text, count}) {
  return (
    <tr>
      <td>{text}</td>
      <td>{count}</td>
    </tr>
  )
}

function Header({ text }) {
  return <h2>{text}</h2>
}

function Button({handleClick, text}) {
  return <button onClick={handleClick}>{text}</button>
}

export default App
