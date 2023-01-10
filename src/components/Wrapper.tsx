import styled from "styled-components";

import TodoParent from "./TodoParent";

type WrapperPropTypes = {
    themeToggler: () => void;
    light: boolean;
}

const Wrapper = function(props: WrapperPropTypes) {
    return(
        <Wrap>
            <div className="img-container"></div>
            <TodoParent light={props.light} themeToggler={props.themeToggler} />
        </Wrap>
    )
}

export default Wrapper;

const Wrap = styled.div`
    height: 100vh;
    width: 100vw;
    background: ${props => props.theme.screen};
    position: relative;

    .img-container {
        height: 18.75rem;
        background-image: url(${props => props.theme.image});
        background-repeat: no-repeat;
        background-size: 100vw;

        // Below 600px
        @media(max-width: 37.5em) {
            background-size: auto;
        }
    }
`