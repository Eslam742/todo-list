'use client'

import Link from 'next/link'
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useAppDispatch } from '@/hooks/hooks'
import { addTodoList } from '@/services/redux/features/todoListSlice'

export default function Header() {
  const [inputValue, setInputValue] = useState('')
   const [counter, setcounter] = useState({count:0,})



  const dispatch = useAppDispatch()

  const inputRef = useRef<HTMLInputElement>(null)

  const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const addTodoButtonHandler = () => {
    dispatch(addTodoList({ id: uuidv4(), name: inputValue, tasks: [] }))
    setInputValue('')

    setcounter({
      count:counter.count+1
})



  }



  const enterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodoButtonHandler()
      inputRef.current?.blur()
    }
  }

  return (
    <header className='z-10 bg-black h-16 flex items-center justify-center max-sm:h-24 sticky top-0 opacity-95'>
      <div className='container mx-auto flex flex-col max-sm:flex-col items-center justify-between px-4'>
        <div className='flex space-x-4 max-sm:m-3'>
          <Link href='/' className='text-white hover:text-gray-200 mt-5 p-5 flex flex-start'>
            Todo List
          </Link>
          <Link href='/' className='text-white hover:text-gray-200 mt-5 p-5 flex flex-start'>
            Titles todolist : {counter.count}
          </Link>

        </div>
        <div className='flex space-x-4 max-sm:mb-3 mt-5 '>
          <input
            ref={inputRef}
            type='text'
            className='w-60 border border-gray-300 rounded px-2 py-1 text-black'
            placeholder='Todo list title'
            value={inputValue}
            onChange={inputValueHandler}
            onKeyDown={enterPressHandler}
          />
          <button
            type='button'
            onClick={addTodoButtonHandler}
            className='bg-gray-600 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded'
          >
            Add
          </button>
        </div>
      </div>
    </header>
  )
}