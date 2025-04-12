import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
 // id: number
  description: string
  //isDone: boolean
}

function App() {
  const [todoDescription, setTodoDescription] = useState('')
  //const [todoList, setTodoList] = useState<Todo[]>([])

  const [todoList, setTodoList] = useState<Todo[]>(() => {
  // Recuperar datos del Local Storage al inicializar el estado
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

    tempTodoList.unshift(newTodo)
    setTodoList(tempTodoList)
    setTodoDescription('') // Limpiar el input después de agregar
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
            <input type="checkbox"/>
            {todo.description}</li>
        })}
      </ul>
    </div>
    </>
  )
}

export default App
