import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import QuestionCard from "../questionCard/QuestionCard";
import ForumQuestionsContext from "../../../contexts/QuestionsContext";

const StyledQuestions = styled.div`
    position: relative;
    background-color: #191919;
    color: white;
    
    > h1 {
        margin: 0;
        text-align: center;
        padding: 20px 0;
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-bottom: 20px;
    }

    > a > button {
        position: absolute;
        top: 20px;
        right: 20px;
        /* padding: 10px 20px; */
        font-weight: 600;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: 10px;
        color: #ae00ff;
        background-color: #ffffff00;
    }

`

const AllQuestions = () => {

    const {questions} = useContext(ForumQuestionsContext);

    return ( 
        <StyledQuestions>
            <Link to='/questions/addNew'><button>Ask Question</button></Link>
            <h1>All questions</h1>
            <div>
                {
                    questions.map(question => {
                        return <QuestionCard 
                            key={question.id}
                            data={question}
                        />
                    })
                }
            </div>
        </StyledQuestions>
     );
}
 
export default AllQuestions;