import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectTodos} from "../../../filter/filterSlice";
import {todosLoadAll, todosToggleDone, todosToggleImportant, todosRemove} from "../../todosSlice";
import {TodosItem} from "../TodosItem/TodosItem"
import styles from './TodosList.module.css'
import {Filter} from "../../../filter/components/Filter/Filter";
import {AddForm} from "../AddForm/AddForm";

const Loading = ()=>{
    return(<b>Loading...</b>);
}

const Error: React.FC<{error:string}> = ({error})=> {
    return(<b style={{color:"red"}}>{error}</b>)
}

export const TodosList: React.FC = () => {

    useEffect(()=>{
        dispatch(todosLoadAll())
    }, [])

    const dispatch = useAppDispatch();
    const items = useAppSelector(selectTodos);
    const state = useAppSelector((state)=>state)

    return(
            <div className={styles.flex}>
                <div className={styles.leftField}>&nbsp;</div>
                <div className={styles.todoList}>
                    {!state.todos.error && !state.todos.loading?<Filter/>:undefined}
                    {
                        state.todos.error? <Error error={state.todos.error}/> : state.todos.loading?<Loading/>:
                            <>
                                {<hr/>}
                                {items.map((el) => {
                                        return <TodosItem {...el} key={el.id}/>
                                    })}
                                {<hr/>}
                                {<AddForm/>}
                            </>
                    }
                </div>
                <div className={styles.rightField}>&nbsp;</div>
            </div>
    )
}
