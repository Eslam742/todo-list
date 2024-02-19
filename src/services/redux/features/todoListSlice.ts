import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ITask,
  ITodoListState,
  ITodoList,
} from "@/services/type/todoList.interface";

const selectedTodo = (id: string, todoLists: ITodoList[]) => {
  return todoLists.filter((todo) => todo.id === id);
};

const initialState: ITodoListState = {
  todoLists: [],


};

export const todoList = createSlice({
  name: "totoList",
  initialState,
  reducers: {
    addTodoList: (
      state,
      action: PayloadAction<{ id: string; name: string; tasks: ITask[] }>,
    ) => {
      state.todoLists.push({
        id: action.payload.id,
        name: action.payload.name,
        tasks: action.payload.tasks,
      });
    },
    setTodoLists(state, action: PayloadAction<ITodoList[]>) {
      state.todoLists = action.payload;
    },
    addTask(state, action: PayloadAction<{ id: string; task: ITask }>) {
      const todo = selectedTodo(action.payload.id, state.todoLists);
      todo[0].tasks.push(action.payload.task);
    },
    deleteTask(
      state,
      action: PayloadAction<{ id: string; selectedTaskId: string }>,
    ) {
      const todo = selectedTodo(action.payload.id, state.todoLists);
      todo[0].tasks = todo[0].tasks.filter(
        (task) => task.id !== action.payload.selectedTaskId,
      );
    },
    changeIsDone(
      state,
      action: PayloadAction<{ id: string; selectedTaskId: string }>,
    ) {
      const todo = selectedTodo(action.payload.id, state.todoLists);
      const task = todo[0].tasks.filter(
        (task) => task.id === action.payload.selectedTaskId,
      );
      task[0].isDone = !task[0].isDone;
    },
  },
});

export const { addTodoList, setTodoLists, addTask, deleteTask, changeIsDone } =
  todoList.actions;
export default todoList.reducer;
