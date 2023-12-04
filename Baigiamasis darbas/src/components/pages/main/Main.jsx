import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledMain = styled.main`
    height: calc(100vh - 93px);
    box-sizing: border-box;
    background-color: #191919;
    color: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > h1 {
        color: #ffdd00;
        font-size: 58px;
        margin-bottom: 0;

        > span {
            color: white;
        }
    }

    > p {
        width: 300px;
        text-align: center;
        line-height: 150%;
    }

    > button {
        padding: 10px 20px;
        background-color: #ffdd00;
        border: 2px solid #ffdd00;
        border-radius: 5px;

        > a {
            text-decoration: none;
            font-weight: 600;
            color: black;
        }
    }
`

const Main = () => {
    return ( 
        <StyledMain>
            <h1>Welcome to <span>FORUM</span>BEE!</h1>
            <p>Here we ask questions and get answers
            given from people all around the world.
            Go to forum, ask your question
            an live happy, problem free, life.</p>
            <button><NavLink to='/questions/allQuestions'>Let's Go</NavLink></button>
        </StyledMain>
     );
}
 
export default Main;