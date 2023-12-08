import { useContext, useState } from "react";
import {v4 as uuid} from 'uuid';
import styled from "styled-components";
import ForumAnswersContext from "../../../contexts/AnswersContext";
import UsersContext from "../../../contexts/UsersContext";
import { useParams } from "react-router-dom";

const StyledAnswer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    textarea {
        border: 2px solid #ffdd00;
        border-radius: 5px;
        background-color: #ffdd0039;
        color: white;
        padding: 10px;
        margin-bottom: 10px;
    }

    textarea::placeholder{
        color: #ffffffa7;
    }

    > button {
        border: 2px solid #ffdd00;
        background-color: #ffffff00;
        color: #ffdd00;
        cursor: pointer;
        font-weight: 600;
        padding: 10px 20px;
        border-radius: 5px;
        margin-bottom: 20px;
    }
`

const AddAnswer = () => {

    const {setAnswer, AnswersActionTypes} = useContext(ForumAnswersContext)
    const [answerText, setAnswerText] = useState('')
    const {loggedInUser} = useContext(UsersContext);
    const {id} = useParams();

    const handleSubmit = () => {
        if(answerText.trim() === ''){ 
            return;
        }

        const values = {
            id: uuid(),
            questionId: id,
            userId: loggedInUser.id,
            answer: answerText,
            likes: 0,
            modified: false,
            answered: new Date().toISOString()
        }
        setAnswer({type: AnswersActionTypes.add, data: values})
        setAnswerText('')
    }

    return ( 
        <StyledAnswer>
            <textarea 
            name="answer" 
            id="answer" 
            cols="61" 
            rows="6" 
            placeholder="Enter your answer here..."
            onChange={(e) => setAnswerText(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit}>Answer</button>
        </StyledAnswer>
     );
}
 
export default AddAnswer;