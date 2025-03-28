import React, { useState } from 'react'
import './App.css'

const App = () => {

  const [inputText, setInputText] = useState('');
  const [todoData, setTodoData] = useState<{ text: string; id: number }[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [itemId, setId] = useState(0);

  function addTodo() {
    if (inputText.trim() === '') return;

    const newTodo = { text: inputText, id: itemId };
    setTodoData([...todoData, newTodo]); 
    setInputText(''); 
    setId(itemId + 1);
  }

  function markAsDone(id:number, e:HTMLButtonElement){
    if(!done.includes(id)){
      setDone((prev:number[]) => [...prev, id]);
    }
    e.className = 'todo-undone'
    e.textContent = 'Undone'
    const todoItem = document.getElementById(`${id}`)
    if(todoItem){
      todoItem.classList.add('done')
    }
    
  }

  function markAsUndone(id:number, e:HTMLButtonElement){
    setDone(d => d.filter(item => item != id));
    e.className = 'todo-done'
    e.textContent = 'Done'
    const todoItem = document.getElementById(`${id}`)
    if(todoItem){
      todoItem.classList.remove('done')
    }
  }

  function removeTodo(id:number){
    setTodoData(todoData.filter(item => item.id !== id))
  }
  return (
    <div className='todo-box'>
      <h1>Daily Todo's</h1>
      <div className='add-todo'>
        <input type="text" placeholder='Add a task' className='add-input' onChange={(e) => {setInputText(e.target.value)}} value={inputText}/>
        <button className='add-button' onClick={addTodo}>Add Task</button>
      </div>
      <ul className='todo-list'>
        {todoData.map((todo) => (

          <li className='todo-item' key={todo.id} id={todo.id.toString()}>
            <p>{todo.text}</p>
            <div className="item-button-box">
              <button className='todo-done' onClick={(e) => e.currentTarget.className === 'todo-done' ? markAsDone(todo.id, e.currentTarget) : markAsUndone(todo.id, e.currentTarget)}>Done</button>
              <button className='todo-remove' onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          </li>

        ))}
      </ul>
    </div>
  )
}

export default App
