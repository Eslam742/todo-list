import { ReactNode } from "react"

export interface ITask {
  id: string
  title: string
  isDone: boolean
}

export interface ITodoList {
  id: string
  name: string
  tasks: ITask[]


}

export interface ITodoListState {
  todoLists: ITodoList[]
  count?:number
handledelete?:ReactNode
}

export type TFilter = 'All' | 'Active' | 'Completed'
