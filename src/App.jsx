import TodoApp from './TodoApp'; // adjust path if needed

function App() {
   return (
      <div className='min-h-screen bg-gray-900 flex flex-col items-center py-8 px-4'>
         <h1 className='text-3xl md:text-4xl font-extrabold text-white mb-6 text-center'>
            🚀 My Todo App
         </h1>
         <TodoApp />
      </div>
   );
}

export default App;
