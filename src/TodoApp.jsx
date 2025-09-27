import { useState, useCallback, useMemo, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoApp() {
   const [todos, setTodos] = useState(() => {
      return JSON.parse(localStorage.getItem('todos') || '[]');
   });

   const [input, setInput] = useState('');

   // ✅ Add new todo
   const addTodo = useCallback(() => {
      if (!input.trim()) return;
      setTodos((prev) => [
         ...prev,
         { id: Date.now(), text: input, completed: false },
      ]);
      setInput('');
   }, [input]);

   useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
   }, [todos]);

   function handleKeydown(e) {
      if (e.key === 'Enter') {
         addTodo();
      }
   }

   // ✅ Delete todo
   const deleteTodo = useCallback((id) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
   }, []);

   // ✅ Toggle completed
   const toggleTodo = useCallback((id) => {
      setTodos((prev) =>
         prev.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
         )
      );
   }, []);

   // ✅ Stats with useMemo
   const stats = useMemo(() => {
      const total = todos.length;
      const completed = todos.filter((t) => t.completed).length;
      return { total, completed };
   }, [todos]);

   return (
      <div className='min-h-screen flex items-center justify-center bg-gray-900 px-4'>
         <div className='w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg'>
            {/* Header */}
            <h2 className='text-2xl font-bold text-white mb-2'>Todo List</h2>
            <p className='text-gray-400 mb-4'>
               Todos: <span className='text-white'>{stats.total}</span> |
               Completed:{' '}
               <span className='text-green-400'>{stats.completed}</span>
            </p>

            {/* Input + Button */}
            <div className='flex gap-2 mb-4'>
               <input
                  onKeyDown={handleKeydown}
                  type='text'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Add a new task...'
                  className='
              flex-grow px-3 py-2 
              rounded-md 
              bg-gray-700 text-white 
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            '
               />
               <button
                  onClick={addTodo}
                  className='
              px-4 py-2 
              rounded-md 
              bg-indigo-600 text-white 
              hover:bg-indigo-700
              transition duration-200
            '
               >
                  ➕
               </button>
            </div>

            {/* Todo List */}
            {todos.length === 0 ? (
               <p className='text-gray-500 text-center'>
                  No todos yet. Add one!
               </p>
            ) : (
               <ul>
                  {todos.map((todo) => (
                     <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={deleteTodo}
                        onToggle={toggleTodo}
                     />
                  ))}
               </ul>
            )}
         </div>
      </div>
   );
}

export default TodoApp;
