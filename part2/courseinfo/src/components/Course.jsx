

function Course({ course }) {
    const total = course.parts.map((p) => p.exercises_count).reduce((p, n) => n + p)
  
    return (
      <div>
        <Header text={course.name}/>
        <Content parts={course.parts}/>
        <Total count={total}/>
      </div>
    )
  }
  
  function Total({ count }) {
    return (
      <p>The total number of exercises is {count}</p>
    )
  }
  
  function Content({ parts }) {
    return (
      <>
        {parts.map((p) => <Part key={p.id} name={p.name} exercises_count={p.exercises_count}/>)}
      </>
    )
  }
  
  function Part({ name, exercises_count}) {
    return (
      <p>Part name: {name} | Exercises count: {exercises_count}</p>
    )
  }
  
  function Header({ text }) {
    return (
      <h2>{text}</h2>
    )
  }

export default Course