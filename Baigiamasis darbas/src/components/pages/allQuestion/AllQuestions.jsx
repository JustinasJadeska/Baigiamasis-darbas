import { useContext } from "react";
import styled from "styled-components";
import QuestionCard from "../questionCard/QuestionCard";
import ForumQuestionsContext from "../../../contexts/QuestionsContext";

const StyledQuestions = styled.div`
    /* height: calc(100vh - 93px);
    box-sizing: border-box; */
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
`

const AllQuestions = () => {

    const {questions} = useContext(ForumQuestionsContext);

    return ( 
        <StyledQuestions>
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