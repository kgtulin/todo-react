import React from "react";
import {ITodo} from "../../todosTypes";
import styles from "./TodosItem.module.css";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {todosToggleDone, todosToggleImportant, todosRemove} from "../../todosSlice"

type TodoItemProps = ITodo;

export const TodosItem: React.FC<TodoItemProps> = ({id, title, done, important}) => {

    const dispatch=useAppDispatch();
    const itemStyles = {
        textDecoration: "none",
        fontWeight: "normal",
        cursor: "pointer"
    }

    if(done) itemStyles.textDecoration="line-through";
    if(important) itemStyles.fontWeight="bold";

    return (
        <div className={styles.row}>
            <div className={styles.title} onClick={()=>dispatch(todosToggleDone(id))} style={itemStyles}>{title}</div>
            <div className={styles.buttons}>
                <button title="Пометить как важное" onClick={()=>dispatch(todosToggleImportant(id))}>imp</button>
                <button title="Удалить" style={{color:"red"}} onClick={
                        () =>{ if(window.confirm('Действительно удалить запись "'+title+'"?'))dispatch(todosRemove(id)) }
                }>del</button>
            </div>
        </div>
    )
}
