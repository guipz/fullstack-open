import './App.css'
import "./index.css"

function App() {
  const course =  {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises_count: 10 },
      { name: 'Using props to pass data', exercises_count: 7 },
      { name: 'State of a component', exercises_count: 14 }
    ]
  }

  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total count={course.parts[0].exercises_count + course.parts[1].exercises_count + course.parts[2].exercises_count}/>
    </div>
  )

}

function Total(props) {
  return (
    <p>The total number of exercises is {props.count}</p>
  )
}

function Content(props) {
  return (
    <>
      <Part name={props.parts[0].name} exercises_count={props.parts[0].exercises_count}/>
      <Part name={props.parts[1].name} exercises_count={props.parts[1].exercises_count}/>
      <Part name={props.parts[2].name} exercises_count={props.parts[2].exercises_count}/>
    </>
  )
}

function Part(props) {
  return (
    <p>Part name: {props.name} | Exercises count: {props.exercises_count}</p>
  )
}

function Header(props) {
  return (
    <h1>{props.title}</h1>
  )
}

export default App
