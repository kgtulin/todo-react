export interface  ITodo {
    id: string,
    title: string,
    done: boolean,
    important: boolean
}

export interface ITodoState {
    loading: boolean,
    error: string | null,
    items: ITodo[]
}
