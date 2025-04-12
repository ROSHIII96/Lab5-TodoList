import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  description: string
  completed: boolean
  time: string
}

function App() {
  //const currentTime = new Date().toLocaleTimeString(); 

  const currentDate = new Date().toLocaleDateString('en-US');   

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




 //Esta función elimina una tarea por su índice(cambioEmma)

 
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

  // Funcion para manejar el cambio en el checkbox (CambioEmma)
const handleComplete = (indexToUpdate: number) => {
  const updatedTodoList = [...TodoList]
  updatedTodoList[indexToUpdate].completed = !updatedTodoList[indexToUpdate].completed
  setTodoList(updatedTodoList)
}

const handleCheckBox = (index: number) => {
  const tempTodoList = [...TodoList];
  const updatedTodo = { ...tempTodoList[index] };
  updatedTodo.completed = !updatedTodo.completed;  
  updatedTodo.time = updatedTodo.completed ? currentDate : "";  

 
  tempTodoList[index] = updatedTodo;

  //las completadas van al final
  const sortedList = tempTodoList.sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;  // Las tareas completadas se mueven al final
  });

  // Actualiza 
  setTodoList(sortedList);
};


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



      {TodoList.map((todo, index) => { //actualizacion para el check(emma)
  return (
    <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <input 
      type="checkbox" 
     checked={todo.completed} 
     onChange={() => handleCheckBox(index)} 
/>

      {" " + todo.description} - 
      {todo.completed ? <span> Completado el dia: {todo.time}</span> : <span> No completado</span>}
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