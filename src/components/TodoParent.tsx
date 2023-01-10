import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { clearCompletedTodos } from "../store/todoReducer";

import InputForm from "./InputForm";
import TodoComponent from "./TodoComponent";
import Moon from '../assets/Moon.png';
import Sun from '../assets/Sun.png';
import React, { useEffect, useState } from "react";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type TodoParentPropsTypes = {
    themeToggler:()=> void;
    light: boolean;
}

const TodoParent = function(props: TodoParentPropsTypes) {
    const dispatch = useDispatch();
    const todosList = useSelector((state:RootState) => state.todoReducer);
    const [state, setState] = useState('All');

    let [list, setList] = useState(todosList);

    useEffect(()=> {
        setList(todosList)
    }, [todosList])

    const activeRemaining = list.filter(each => {
        return each.isActive === false
    });

    const activeTasks = list.filter(each => {
        return each.isActive === false
    })

    const completedTasks = list.filter(each => {
        return each.isActive === true
    })

    const allFilterHandler = function(event: React.MouseEvent<HTMLButtonElement>) : void {
        setState('All');
    }

    const activeFilterHandler = function(event: React.MouseEvent<HTMLButtonElement>) : void {
        setState('Actives')
    }

    const completedHandler = function(event: React.MouseEvent<HTMLButtonElement>) : void {
        setState('Completed')
    }   

    const clearCompletedHandler = function() {
        dispatch(clearCompletedTodos())
    }

    const allTasksContent = list.map((each, index) => {
              return  <Draggable key={each.id} index={index} draggableId={each.id}>
                    {(provided) => (
                        <TodoComponent light={props.light} todo={each}
                         draggableProps={provided.draggableProps}
                         dragHandleProps={provided.dragHandleProps}
                         refProp={provided.innerRef}  />
                        )}
              </Draggable>
    })

    
    const activeTasksContent = activeTasks.map((each) => {
        return <TodoComponent light={props.light} key={each.id} todo={each} />
    })

    const completedTasksContent = completedTasks.map((each) => {
        return <TodoComponent light={props.light} key={each.id} todo={each} />
    })

    const dragEndHandler = function(result: any) {
        if (!result.destination) return;
        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setList(items);
    }

    const themeHandler= function() {
        props.themeToggler();
    }

    const listContent = <Droppable droppableId="todosList">
    {(provided) => (
    <ul className="list-container" {...provided.droppableProps} ref={provided.innerRef}>
        {state === 'All' ? allTasksContent : null}
        {state === 'Actives' ? activeTasksContent : null}
        {state === 'Completed' ? completedTasksContent : null}
         <div className="extra-box">
            <span className="remaining">{activeRemaining.length} items left</span>
            <button className="clear" onClick={clearCompletedHandler}>Clear Completed</button>
        </div>
         {provided.placeholder}
    </ul> 
    )}
        </Droppable>

    return (
        <ParentWrapper>
            <div className="header">
                <span className="title">TODO</span>
                <img onClick={themeHandler} className="themer" src={props.light ? Moon : Sun} alt="Moon icon" />
            </div>
            <InputForm light={props.light} />
                    <DragDropContext onDragEnd={dragEndHandler}>
                        {list.length > 0 ? listContent : null}
                    </DragDropContext>

            <div className="filter-box">
                <span className="remaining gray">{activeRemaining.length} items left</span>
                <div className="helper-box">
                    <button className={state === 'All' ? 'btn hover-blue' : 'btn'} onClick={allFilterHandler}>All</button>
                    <button className={state === 'Actives' ? 'btn hover-blue' : 'btn'} onClick={activeFilterHandler}>Active</button>
                    <button className={state === 'Completed' ? 'btn hover-blue' : 'btn'} onClick={completedHandler}>Completed</button>
                </div>
                <button onClick={clearCompletedHandler} className="clear gray">Clear Completed</button>
            </div>
        </ParentWrapper>
    )
}

export default TodoParent;

const ParentWrapper = styled.div`
    width: 33.75rem;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    overflow: hidden;
    top: 10%;
    transform: translateX(-50%);

    // Below 600px
    @media(max-width: 37.5em) {
        width: 20.4rem;
    }

    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 3rem;

        .title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #FFF;
            letter-spacing: 0.9rem;
        }

        .img {
            height: 1.6rem;
            width: 1.6rem;
        }

        .themer {
            cursor: pointer;
        }
    }

    .rmv {
        display: none;
    }

    .list-container {
        width: 100%;
        box-shadow: 0px 35px 50px -15px rgba(194, 195, 214, 0.5);
        overflow: hidden;

        .extra-box {
            display: flex;
            justify-content: space-between;;
            align-items: center;
            gap: 1rem;
            width: 100%;
            background: ${props => props.theme.listBoxes};
            padding: 0 1rem;
            height: 0rem;

            opacity: 0;
            pointer-events: none;

            // Below 600px
            @media(max-width: 37.5em) {
                opacity: 1;
                pointer-events: auto;
                height: 4rem;
            }

            .remaining {
                color: #9495A5;
                font-weight: 700;
            }

            .clear {
                background: none;
                font-weight: 700;
                color: #9495A5;
                border: none;
            }
        }
    }

    .filter-box {
        height: 3.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: ${props => props.theme.listBoxes};
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 0 1.5rem;

        // Below 600px
        @media(max-width: 37.5em) {
            justify-content: center;
        }

        .remaining {
            @media(max-width: 37.5em) {
                display: none;
            }
        }

        .clear {
            @media(max-width: 37.5em) {
                display: none;
            }
        }


        .helper-box {
            display: flex;
            align-items: center;
            gap: 0.8rem;

            *{
                background: none;
                color: #9495A5;
                font-weight: 700;
                border: none;
                cursor: pointer;
            }
        }

        .clear {
            background: none;
            border: none;
            cursor: pointer;
        }

        .gray {
            color: #9495A5;
        }

        .hover-blue {
            color: #3A7CFD;
        }
    }


`