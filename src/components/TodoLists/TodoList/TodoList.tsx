import { useState, ChangeEvent, KeyboardEvent, useRef } from 'react'
import { BsFillPlusSquareFill, BsTrash3Fill } from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid'

import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { addTask, setTodoLists } from '@/services/redux/features/todoListSlice'
import { ITask, ITodoList, TFilter } from '@/services/type/todoList.interface'
import Task from './Task/Task'

export default function TodoList(props: ITodoList) {
  const [inputValue, setInputValue] = useState<string>('')
  const [filterValue, setGetFilterValue] = useState<TFilter>('All')

  const dispatch = useAppDispatch()

  const allTodolists = useAppSelector((state) => state.todoListSlice.todoLists)

  const inputRef = useRef<HTMLInputElement>(null)

  const filterTasks = () => {
    return props.tasks.filter((task) => {
      switch (filterValue) {
        case 'Active':
          return !task.isDone
        case 'Completed':
          return task.isDone
        default:
          return true
      }
    })
  }

  const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const addTaskButtonHandler = () => {
    dispatch(
      addTask({
        id: props.id,
        task: { id: uuidv4(), title: inputValue, isDone: false },
      }),
    )
    setInputValue('')
  }

  const enterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskButtonHandler()
      inputRef.current?.blur()
    }
  }

  const deleteTodoListButtonHandler = (todoId: string) => {
    dispatch(
      setTodoLists(
        allTodolists.filter((item: ITodoList) => item.id !== todoId),
      ),
    )

  }





  const filterHandler = (filter: TFilter) => {
    setGetFilterValue(filter)
  }

  return (
    <div className='relative p-4 border border-greay-50 rounded-md mt-[35px] pt-5 text-white'>
      <h2 className='text-2xl font-bold mb-4'>{props.name}</h2>
      <div className='flex mb-4'>
        <input
          ref={inputRef}
          type='text'
          className='flex-grow mr-2 border border-gray-300 rounded px-2 py-1 text-black'
          placeholder='Enter a task'
          onChange={inputValueHandler}
          value={inputValue}
          onKeyDown={enterPressHandler}
        />
        <button
          type='button'
          onClick={addTaskButtonHandler}
          className='text-gray-500 hover:text-gray-600 text-3xl'
        >
          <BsFillPlusSquareFill />
        </button>
      </div>
      <div className='mb-10 text-white'>
        {filterTasks().map((task: ITask) => {
          return (
            <Task
              key={task.id}
              taskId={task.id}
              taskTitle={task.title}
              todoId={props.id}
              isDone={task.isDone}
            />
          )
        })}
      </div>
      <div className='w-11/12 absolute bottom-0 flex justify-between items-center mb-4 mt-4 text-white'>
        <div>
          <input
            onClick={() => filterHandler('All')}
            defaultChecked={true}
            type='radio'
            id='filter-all'
            name='filter'
            value='All'
          />
          <label htmlFor='filter-all' className='ml-2 mr-4 text-white'>
            All
          </label>
          <input
            onClick={() => filterHandler('Active')}
            type='radio'
            id='filter-active'
            name='filter'
            value='Active'
          />
          <label htmlFor='filter-done' className='ml-2 mr-4 text-white'>
            Active
          </label>
          <input
            onClick={() => filterHandler('Completed')}
            type='radio'
            id='filter-completed'
            name='filter'
            value='Completed'
          />
          <label htmlFor='filter-inprocess' className='ml-2 text-white'>
            Completed
          </label>
        </div>
        <button
          type='button'
          className='text-red-500 hover:text-red-400 text-3xl'
          onClick={() => deleteTodoListButtonHandler(props.id)}
        >
          <BsTrash3Fill   />
        </button>
      </div>
    </div>
  )
}
