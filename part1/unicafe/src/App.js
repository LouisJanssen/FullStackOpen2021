import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Statistic = ({text, value}) =>{
    if (text === "Positive"){
        return(
            <tr>
                <td>{text}</td> 
                <td>{value}%</td> 
            </tr>
        )
    }
    return(
        <tr>
            <td>{text}</td> 
            <td>{value}</td> 
        </tr>
    )
}

const Statistics = ({click}) => {
    const all = click.good + click.neutral + click.bad
    const average = (click.good - click.bad) / (all)
    const positive = (click.good / all) * 100

    if (all === 0){
        return (
            <div>No feedback given</div>
        )
    }
    return (
        <table>
            <tbody>
                <Statistic text="Good" value={click.good}/>
                <Statistic text="Neutral" value={click.neutral}/>
                <Statistic text="Bad" value={click.bad}/>
                <Statistic text="All" value={all}/>
                <Statistic text="Average" value={average}/>
                <Statistic text="Positive" value={positive}/>
            </tbody>
        </table>
    )
}

const Button = ({onClick, text}) => {
    return(
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [click, setClick] = useState({good: 0, neutral: 0, bad: 0})
    const handleGoodClick = () => setClick({...click, good: click.good + 1})
    const handleNeutralClick = () => setClick({...click, neutral: click.neutral + 1})
    const handleBadClick = () => setClick({...click, bad: click.bad + 1})

    return (
        <div>
            <Header text="Give feedback"/>
            <Button onClick={handleGoodClick} text="Good"/>
            <Button onClick={handleNeutralClick} text="Neutral"/>
            <Button onClick={handleBadClick} text="Bad"/>
            <Header text="Statistics"/>
            <Statistics click={click}/>
        </div>
    )
}

export default App