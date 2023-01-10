import styled from "styled-components";

import { useDispatch } from "react-redux";
import { removeTodo, toggleTodo } from "../store/todoReducer";

import Path from '../assets/Path.svg';
import DeleteSvg from '../assets/DeleteSvg.svg';
import React from "react";

type TodoComponentTypes = {
    todo: {
        todo: string;
        isActive: boolean;
        id: number;
    },
    draggableProps?:any,
    dragHandleProps?:any,
    refProp?:any,
    light: boolean,
}

const TodoComponent = function(props: TodoComponentTypes) {
    const dispatch = useDispatch();

    const toggleHandler = function(): void {
        dispatch(toggleTodo({id: props.todo.id }))
    }

    const removeHandler = function(): void {
        dispatch(removeTodo({id: props.todo.id}))
    }


    return(
            <StyledLi {...props.dragHandleProps} {...props.draggableProps} ref={props.refProp}  className="single-list-box">
                <div className="toggle-box">
                <button style={{background: props.todo.isActive ? 'linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)' : '' }}  onClick={toggleHandler} className="toggle"><img src={Path} alt="svg toggle" /></button>
                </div>
                <div style={{color: props.todo.isActive ? '#D1D2DA' : '#393A4B', textDecoration: props.todo.isActive ? 'line-through' : 'none'}} className="note">{props.todo.todo}</div>
                <button onClick={removeHandler} className="delete"><img className="deleteSvg" src={DeleteSvg} alt="Delete svg" /></button>
            </StyledLi>
    )
}

export default TodoComponent;

const StyledLi = styled.li`
    width: 100%;
    height: 4rem;
    display: flex;
    background: ${props => props.theme.listBoxes};
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.listBottomBorder};

    &:active {
        opacity:0;
    }

    &:hover {
        .delete {
            opacity: 1;
            pointer-events: auto;
        }
    }

    .toggle-box {
        width: 4.5rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .toggle {
            height: 1.5rem;
            width: 1.5rem;
            border-radius: 50%;
            border: 1px solid #E3E4F1;
            cursor: pointer;
            transition: all 0.15s;
            background: ${props => props.theme.listBoxes};
        }
    }
    
    .note {
        width: 100%;
        font-weight: 400;
        font-size: 1.1rem;
        letter-spacing: -0.25px;
        color: ${props => props.theme.listTyping} !important;
    }

    .delete {
        background: transparent;
        border: none;
        margin-right: 1.5rem;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
    }

    .deleteSvg {
        height: 1.2rem;
        width: 1.2rem;
    }
`