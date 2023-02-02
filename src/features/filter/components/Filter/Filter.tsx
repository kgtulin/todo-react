import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {filterSetActiveOnly, filterSetImportantOnly, filterSetFilter} from "../../filterSlice";
import styles from  "./Filter.module.css";


export const Filter = () => {
    const dispatch=useAppDispatch();
    const state=useAppSelector(state=>state.filter);

    const changeFilter = (value:string) => {
        dispatch(filterSetFilter(value));
    }

    const activeOnlyButtonClass = state.showActiveOnly ? styles.buttonActive : styles.buttonNormal;
    const importantOnlyButtonClass = state.showImportantOnly ? styles.buttonActive : styles.buttonNormal;

    return(
        <>
            <div className={styles.flex}>
                <input className={styles.input} type="text" placeholder="Фильтр задач" onChange={(e)=>{changeFilter(e.target.value)}}/>
                <div className={styles.buttons}>
                    <button className={activeOnlyButtonClass}
                            onClick={(e)=>{dispatch(filterSetActiveOnly(!state.showActiveOnly))}}
                            title="Только активные">active</button>

                    <button className={importantOnlyButtonClass}
                            onClick={(e)=>{dispatch(filterSetImportantOnly(!state.showImportantOnly))}}
                            title="Только важные">important</button>
                </div>
            </div>
        </>
        )
}
