import {useState} from 'react'

const Header = (props) => {

  return (
    <h1>
      {props.courseName}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.val.name} {props.val.exercises}
    </p>
  )
}

const Content = (props) => {
  return props.valueArray.map(el => 
      <Part val={el} />
    )
}

const Total = (props) => {
  
  const totalCount = props.valueArray.reduce((acc, val) => acc+= val.exercises, 0)
  
  return (
    <p>Number of exercises {totalCount}</p>
  ) 
}

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     contentArray: [
//         {
//           name: 'Fundamentals of React',
//           exercises: 10
//         },
//         {
//           name: 'Using props to pass data',
//           exercises: 7
//         },
//         {
//           name: 'State of a component',
//           exercises: 14
//         }
//     ]
//   }

//   return (
//     <div>
//       <Header courseName={course.name} />
//       <Content valueArray={course.contentArray} />
//       <Total valueArray={course.contentArray} />
//     </div>
//   )
// }

const History = ({allClicks}) => {

  if (allClicks.length === 0){
    return (
      <div>
        App is used by pressing the buttons 
      </div>
    )
  }

  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    console.log('left before', left)
    const updatedLeft = left + 1;
    setLeft(updatedLeft)
    console.log('left after', updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    console.log('right before', right)
    const updatedRight = right + 1
    setRight(updatedRight)
    console.log('right after', updatedRight)
    setTotal(left + updatedRight)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <History allClicks={allClicks} />
      <p>total {total}</p>
    </div>
  )
}

export default App
