import {FilterState} from "./filterTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

const initialState: FilterState = {
    filter: "",
    showActiveOnly: false,
    showImportantOnly: false
}


export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterSetActiveOnly: (state, action: PayloadAction<boolean>) =>{
            state.showActiveOnly = action.payload;
        },

        filterSetImportantOnly: (state, action: PayloadAction<boolean>)=>{
            state.showImportantOnly = action.payload;
        },

        filterSetFilter: (state, action: PayloadAction<string>) =>{
            state.filter = action.payload;
        }
    }
})


export const selectTodos = (state: RootState) => {
    let items=state.todos.items;
    if(state.filter.showActiveOnly)
        items=items.filter(el => el.done==false);

    if(state.filter.showImportantOnly)
        items=items.filter(el => el.important==true);

    if(state.filter.filter!="")
        items=items.filter(el => el.title.toUpperCase().includes(state.filter.filter.toUpperCase()));

    return items;
}


export const {filterSetActiveOnly, filterSetImportantOnly, filterSetFilter} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
