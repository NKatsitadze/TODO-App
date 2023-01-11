import { createSlice } from "@reduxjs/toolkit";

type todosType = { todo: string, isActive: boolean, id: number };
const initialTodosState: todosType[] = []

export const todoReducer = createSlice({
    name: 'todo',
    initialState:  initialTodosState,
    
    reducers: {
        addTodo: (state, action) => {
            return [action.payload.item, ...state]
        },
        removeTodo: (state, action) => {
           return state.filter(each => {
               return each.id !== action.payload.id
            })
        },
        toggleTodo: (state, action) => {
            state.map(each => {
                if(each.id === action.payload.id) {
                    each.isActive = !each.isActive
                }
            })
        },
        clearCompletedTodos: (state) => {
            return state.filter(each => {
                return each.isActive === false
            })
        },
        reorderTodo:(state, action) => {
            const [reorderedItem] = state.splice(action.payload.result.source.index, 1);
            state.splice(action.payload.result.destination.index, 0, reorderedItem);
        }
    }
})

export const { addTodo, removeTodo, toggleTodo, clearCompletedTodos, reorderTodo } = todoReducer.actions