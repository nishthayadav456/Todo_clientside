import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState('');
  const [updateUI,setUpdateUI]=useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ id: '', toDo: '' });

  useEffect(() => {
    fetchTodos();
  }, [updateUI]);
  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://todo-backend-vt7b.onrender.com/api/get',);
      setTodoList(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  const handleAdd =() => {
   axios.post('https://todo-backend-vt7b.onrender.com/api/create',{toDo:input})
   .then(response=>{
    console.log(response.data)
    setUpdateUI((prevState)=>!prevState)
    setInput("")
   })
   .catch ((error) =>
    console.error('Error fetching todos:', error))
    
  };
  const handleEdit = async (id, currentText) => {
    setCurrentTodo({ id, toDo: currentText });
    setIsModalOpen(true);
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`https://todo-backend-vt7b.onrender.com/api/update/${currentTodo.id}`, { toDo: currentTodo.toDo });
      setUpdateUI(prevState => !prevState);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  const handleDelete = async (id) => {
    console.log('Deleting todo with id:', id); 
    try {
      await axios.delete(`https://todo-backend-vt7b.onrender.com/api/delete/${id}`);
      setTodoList(prevList => prevList.filter(todoItem => todoItem.id !== id));
      setUpdateUI((prevState)=>!prevState)//for reloading
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-6 text-center underline">ToDo App</h1>
        
        <div className="flex justify-center gap-3 mb-6">
          <input 
            type="text"  
            className="w-full py-2 px-3 text-gray-700 border-b-2 border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
            placeholder='Add Todos..'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        {todoList.map((todoItem) => (
          <div key={todoItem._id} className="bg-black flex justify-between items-center rounded mb-4 py-2 px-4 text-white" style={{width:"26rem"}}>
            <div>{todoItem.toDo}</div>
            <div className="flex gap-3">
              <BiEdit 
                className="w-6 h-10 cursor-pointer hover:text-blue-500" 
                onClick={() => handleEdit(todoItem._id, todoItem.toDo)} 
              />
              <AiFillDelete 
                className="w-6 h-10 cursor-pointer hover:text-red-600" 
                onClick={() =>handleDelete(todoItem._id)}
              />
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Edit Todo</h2>
            <input 
              type="text"  
              className="w-full py-2 px-3 text-gray-700 border-b-2 border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 mb-4"
              value={currentTodo.toDo}
              onChange={(e) => setCurrentTodo({ ...currentTodo, toDo: e.target.value })}
            />
            <button 
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300 mr-2"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button 
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default Todo
