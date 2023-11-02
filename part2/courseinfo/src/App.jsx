import './App.css'
import "./index.css"
import Course from './components/Course'

function App() {
  const courses =  [
    {
      id: 1, 
      name: 'Half Stack application development',
      parts: [
        { name: 'Fundamentals of React', exercises_count: 10, id: 1 },
        { name: 'Using props to pass data', exercises_count: 7, id: 2 },
        { name: 'State of a component', exercises_count: 14, id: 3 },
        { name: 'Redux', exercises_count: 11, id: 4}
      ]
    },
    {
      id: 2, 
      name: 'Node.js',
      parts: [
        { name: 'Routing', exercises_count: 3, id: 1 },
        { name: 'Middlewares', exercises_count: 7, id: 2 }
      ]
    }
  ] 

  return (
    <>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => <Course key={course.id} course={course}/>)}
    </>
  )

}

export default App
