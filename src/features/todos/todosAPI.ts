import {ITodo} from "./todosTypes"
import {nanoid} from "@reduxjs/toolkit";

export class TodosAPI {
// A mock function to mimic making an async request for data
    static currentId=4;

    static loadAll = () => {

        if(Math.random()*10<2) {
            throw new Error("Testing the load error. Please try again.");
        }

        return new Promise<ITodo[]>((resolve, reject) =>
            setTimeout(() => resolve([
                {
                    id: "0",
                    title: "Создать приложение",
                    done: false,
                    important: true
                },
                {
                    id: "1",
                    title: "Протестировать приложение",
                    done: true,
                    important: false
                },
                {
                    id: "2",
                    title: "Развернуть приложение",
                    done: false,
                    important: false
                },

            ]), 500)
        );
    }

    static add = (title: string) =>{
        const id=(this.currentId++).toString();

        return new Promise<ITodo>((resolve) =>
            setTimeout(() => resolve({id, title: title, done:false, important:false}), 500)
        )
    }

    static remove = (id:string) => {
        return new Promise<void>((resolve) =>
            setTimeout(() => resolve(), 500)
        )
    }

    static toggleDone = (id:string) => {
        return new Promise<void>((resolve) =>
            setTimeout(() => resolve(), 500)
        )
    }

    static toggleImportant = (id:string) => {
        return new Promise<void>((resolve) =>
            setTimeout(() => resolve(), 500)
        )
    }
}
