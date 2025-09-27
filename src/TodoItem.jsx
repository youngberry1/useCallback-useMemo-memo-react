import { memo } from 'react';

function TodoItem({ todo, onDelete, onToggle }) {
   console.log('Rendering:', todo.text); // 👀 see when it re-renders

   return (
      <li
         className='
        flex items-center justify-between
        bg-gray-800 text-gray-200 
        rounded-md p-3 my-2
        transition duration-200 
        hover:bg-gray-700
      '
      >
         <div className='flex items-center gap-3'>
            <input
               type='checkbox'
               checked={todo.completed}
               onChange={() => onToggle(todo.id)}
               className='
            w-5 h-5 
            accent-indigo-500 
            cursor-pointer
          '
            />
            <span
               className={`${
                  todo.completed
                     ? 'line-through text-gray-500'
                     : 'text-gray-100'
               } text-lg`}
            >
               {todo.text}
            </span>
         </div>

         <button
            onClick={() => onDelete(todo.id)}
            className='
          text-red-400 hover:text-red-500
          transition duration-150
          font-bold text-xl
        '
         >
            ❌
         </button>
      </li>
   );
}

export default memo(TodoItem);
