import React, {SyntheticEvent, useState} from "react";
import {useAppDispatch} from "../../../../app/hooks";
import {todosAdd} from "../../todosSlice";
import styles from "./AddForm.module.css";

export const AddForm = () => {

    const [text, setText] = useState("");
    const dispatch = useAppDispatch();

    const onAddItem= (e: React.SyntheticEvent) =>
    {
        e.preventDefault();

        dispatch(todosAdd(text));
        setText("");
    }

    return(
        <form onSubmit={onAddItem} className={styles.form}>
            <input className={styles.input} type="text" value={text} onChange={(e)=>{setText(e.target.value)}}/>
            <button className={styles.button} onClick={onAddItem}>add</button>
        </form>
    )
}
