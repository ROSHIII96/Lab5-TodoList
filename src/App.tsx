import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  description: string
}

function App() {
  const currentTime = new Date().toLocaleTimeString(); 
  const [todoDescription, setTodoDescription] = useState('')
  //const [todoList, setTodoList] = useState<Todo[]>([])

  // Recuperar datos del Local Storage al iniciar
  const [todoList, setTodoList] = useState<Todo[]>(() => {
  const savedTodos = localStorage.getItem('todoList')
  return savedTodos ? JSON.parse(savedTodos) : []
})

  // Recuperar datos del Local Storage al montar el componente
  useEffect(() => {
    const savedTodos = localStorage.getItem('todoList')
    if (savedTodos) {
      setTodoList(JSON.parse(savedTodos))
    }
  }, [])

  // Guardar datos en Local Storage cuando cambie la lista de tareas
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  const handleChange = (e: any) => {
    setTodoDescription(e.target.value)
  }

  const handleClick = () => {
    const tempTodoList = [...todoList]
    const newTodo = {
      description: todoDescription
    }
    tempTodoList.unshift(newTodo)  //guarda al inicio
    setTodoList(tempTodoList)
    setTodoDescription('') // Limpiar el input después de agregar
  }

  const handleBox = (e: any) => {
    const tempTodoList = [...todoList]
    const firstTodo = tempTodoList[0];
    tempTodoList.shift()
    tempTodoList.push(firstTodo)
    setTodoList(tempTodoList)
  }

  return (
    <>
    <div style={{border: '1px solid red', padding: 10}}>
      <div>
        <input
        value = {todoDescription} 
        onChange={handleChange}
        style = {{marginRight: 10}}/>
        <button onClick={handleClick}>Add Item</button>
      </div>
      <div>TODOS Here</div>
      <ul>
        {todoList.map((todo, index) => {
          return <li key={index}>
            <input type="checkbox" onClick={handleBox}/>
            {todo.description + " - " + currentTime}</li>
        })}
      </ul>
    </div>
    </>
  )
}

export default App
