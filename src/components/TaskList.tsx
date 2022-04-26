import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    if (newTaskTitle == '') return

    // Cria um objeto temporário, para armazenar no array
    const newTasks = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    // Chama a função do useState, usa como parâmetro uma função para adicionar ao array, um novo objeto, o criado temporariamente. (não se usa .push)
    setTasks(tasks => [...tasks, newTasks])
    setNewTaskTitle('')
    console.log(tasks)
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // como percorrer no array tasks, verificar id e mudar isComplete para true
    const marked = tasks.map(tasks => tasks.id === id ? {
      ...tasks,
      isComplete: !tasks.isComplete
    }: tasks)

    setTasks(marked)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // filtra pra um array só os ids que são diferentes do inserido
    const filteredTasks = tasks.filter(task => task.id !== id)

    // coloca no setTasks o array filtrado
    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}