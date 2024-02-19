'use client'
import TodoList from './TodoList/TodoList'
import {useAppSelector} from '@/hooks/hooks'
import {ITodoList} from '@/services/type/todoList.interface'

export default function TodoLists() {
  const allTodolists = useAppSelector((state) => state.todoListSlice.todoLists)

  return (
    <div className='grid grid-cols-4 gap-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
      {allTodolists.map((item: ITodoList) => (
        <TodoList
          key={item.id}
          id={item.id}
          name={item.name}
          tasks={item.tasks}
        />
      ))}
    </div>
  )
}
