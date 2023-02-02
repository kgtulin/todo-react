import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { TodosAPI } from './todosAPI';
import {ITodo, ITodoState} from "./todosTypes";

const initialState: ITodoState = {
    loading: false,
    error: null,
    items: []
}

export const todosLoadAll = createAsyncThunk(
    'todos/loadAll',
    async () => {

        const todos = await TodosAPI.loadAll();
        return todos;
    },
    {
        condition: (_, {getState}) => {
            const loading = (getState() as RootState).todos.loading;
            if(loading) return(false);
        }
    }
);

export const todosAdd = createAsyncThunk(
    'todos/add',
    async (title:string) => {
        const todo = await TodosAPI.add(title);
        return todo;
    }
);

export const todosSlice = createSlice(
    {
        name: "todos",
        initialState,
        reducers: {
            todosToggleDone: (state, action:PayloadAction<string>) => {
                const el=state.items.find(el => el.id==action.payload);
                if(el) el.done=!el.done;
            },

            todosToggleImportant: (state, action: PayloadAction<string>) => {
                const el=state.items.find(el => el.id==action.payload);
                if(el) el.important=!el.important;
            },

            todosRemove: (state, action: PayloadAction<string>) => {
                const index=state.items.findIndex(el => el.id==action.payload);
                state.items.splice(index, 1);
            }

        },
        extraReducers: (builder)=>{
            builder
                .addCase(todosLoadAll.pending, (state, action)=>{
                    state.loading=true;
                    state.error=null;
                })
                .addCase(todosLoadAll.rejected, (state, action)=>{
                    state.loading=false;
                    if(action.error.message)
                        state.error = action.error.message;
                })
                .addCase(todosLoadAll.fulfilled, (state, action)=>{
                    state.loading=false;
                    state.error=null;
                    state.items=action.payload
                })
                .addCase(todosAdd.fulfilled, (state, action)=>{
                    state.items.push(action.payload);
                })
        }
    }
)

export const {todosToggleDone, todosToggleImportant, todosRemove} = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
