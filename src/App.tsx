import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  description: string
  completed: boolean
  time: string
}

function App() {
  //const currentTime = new Date().toLocaleTimeString(); 
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });   
  const [TodoDescription, setTodoDescription] = useState('')

  // Recuperar los datos del Local Storage al iniciar
  const [TodoList, setTodoList] = useState<Todo[]>(() => {
    const savedTodo = localStorage.getItem('TodoList')
    return savedTodo ? JSON.parse(savedTodo) : []
  })
  
    // Guardar datos en Local Storage
  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(TodoList))
  }, [TodoList])

  //Guarda el valor del input en la variable TodoDescription
  const handleChange = (e: any) => {
    setTodoDescription(e.target.value)
  }

//Funcion para que al tocar el boton Add product, este guarde en la lista el valor
const handleClick = () => {
  //if (ProductDescription) {  //Para evitar que si este vacio el campo, no se guarde
  const tempTodoList = [...TodoList]
  const newTodo = {
    description: TodoDescription,
    completed: false,
    time: ""
  } 
  tempTodoList.unshift(newTodo)  //guarda al inicio
  setTodoList(tempTodoList)
  setTodoDescription('') // Limpia el input
/*}
else{
  alert("Porfavor ingrese un producto")
}*/
}

 //Esta función elimina una tarea por su índice
 const handleDelete = (indexToDelete: number) => {
  const updatedList = TodoList.filter((_, index) => index !== indexToDelete)
  setTodoList(updatedList)
 }

  //Funcion para actualizar el producto de la lista
  const handleUpdate = (indexToUpdate: number) => {
    if (TodoDescription) {
      const updatedTodo = [...TodoList]
      updatedTodo[indexToUpdate] = {
        ...updatedTodo[indexToUpdate],
        description: TodoDescription, // Actualiza la descripción
      }
      setTodoList(updatedTodo)
    }

  }

  return (
    <>
    <div style={{border: '1px solid red', padding: 10}}>
      <div>
        <input
        value = {TodoDescription} 
        onChange = {handleChange}
        style = {{marginRight: 10}}
        />
        <button onClick = {handleClick}>Add Item</button>

      </div>
      
      <div>TODOS Here</div>
      <ul>

      {TodoList.map((todo, index) => {
        return (
        <li key={index}>
        <input type="checkbox"/>
        {"Nombre: " + todo.description + ", Momento del check-->>" + todo.time}
        <button onClick={() => handleDelete(index)} style={{ marginLeft: 10, background: 'gray' }}>Eliminar</button>
        <button onClick={() => handleUpdate(index)} style={{ marginLeft: 10, background: '#D0652B' }}>Update</button>
        </li>
        )
        })}

        </ul>
      </div>
    </>
  )
}

export default App