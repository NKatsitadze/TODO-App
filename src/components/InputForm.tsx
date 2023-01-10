import styled from "styled-components";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoReducer";

import Path from '../assets/Path.svg';

type InputFormTypes = {
    light:boolean;
}

const InputForm = function(props: InputFormTypes) {
    type inputType = string;
    const [todo, setTodo] = useState<inputType | ''>('');
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    const submitHandler = function(event:React.MouseEvent<HTMLFormElement>): void  {
        event.preventDefault();
        if(todo.length > 0) {
            dispatch(addTodo({item: {todo: todo, isActive: isActive, id: Math.random().toString()}}))
            setTodo('')
            setIsActive(false);
        }
        return;
    }

    const clickHandler = function(event:React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        setIsActive(prevState => prevState = !prevState);
    }

    const changeHandler = function(event:React.ChangeEvent<HTMLInputElement>): void {
        setTodo(event.target.value)
    }
    

    return (
        <StyledForm onSubmit={submitHandler}>
            <div className="toggle-box">
            <button type="button" style={{background: isActive ? 'linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)' : '' }} onClick={clickHandler} className="toggle"><img src={Path} alt="Check svg" /></button>
            </div>
            <input className="inp" onChange={changeHandler} value={todo} placeholder="Create a new todo..." />
        </StyledForm>
    )
}

export default InputForm;

const StyledForm = styled.form`
    width: 100%;
    height: 4rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background: ${props => props.theme.listBoxes};
    margin-bottom: 1.5rem;

    .toggle-box {
        width: 4.5rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .toggle {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 50%;
        border: 1px solid #E3E4F1;
        background: ${props => props.theme.listBoxes};
        cursor: pointer;
    }

    .inp {
        width: 100%;
        border: none;
        font-weight: 400;
        font-size: 1.1rem;
        letter-spacing: -0.25px;
        color: #393A4B;
        caret-color: #3A7CFD;
        background: ${props => props.theme.listBoxes};

        &:focus {
            outline: none;
        }
    }
`