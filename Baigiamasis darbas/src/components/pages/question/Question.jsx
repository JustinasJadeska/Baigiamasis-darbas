import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ForumQuestionsContext from "../../../contexts/QuestionsContext";
import ForumAnswersContext from "../../../contexts/AnswersContext";
import { Link } from "react-router-dom";

const StyledMain = styled.main`
    background-color: #191919;
    color: white;
    position: relative;
    
    > div {
        width: 50%;
        margin: 0 auto;
    }

    > div p {
        line-height: 150%;
        margin: 0;
        padding: 20px;
    }

    .heading > h1 {
        margin: 0;
        padding: 20px 0;
        color: #ae00ff;
    }

    .heading > p {
        border: 2px solid #ae00ff;
        border-radius: 5px;
        background-color: #ae00ff42;
    }

    .answer {
        padding-bottom: 20px;
    }

    .answer > h2 {
        color: #ffdd00;
    }

    .answer2 > div > p:nth-of-type(1) {
        border: 2px solid #ffdd00;
        border-radius: 5px;
        background-color: #ffdd0039;
    }

    .likes2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .likes {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .buttons > button {
        padding: 5px 10px;
        margin-left: 10px;
        font-weight: 600;
        cursor: pointer;
        width: 80px;
    }

    > a > button {
        position: absolute;
        top: 10px;
        left: 10px;
        padding: 10px 20px;
        font-weight: 600;
        color: #ffdd00;
        background-color: #ffdd0000;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .bi {
        font-size: 18px;
        font-weight: 600;
    }
`

const Question = () => {

    const {id} = useParams();
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();
    const {setQuestions, QuestionsActionTypes} = useContext(ForumQuestionsContext);
    const {setAnswer, AnswersActionTypes} = useContext(ForumAnswersContext);

    useEffect(() => {
        fetch(`http://localhost:8080/questions/${id}`)
        .then(res => res.json())
        .then(data => setQuestion(data))

        fetch(`http://localhost:8080/answers`)
        .then(res => res.json())
        .then((data) => {
            const filteredAnswers = data.filter((answer) => answer.questionId === parseInt(id));
            setAnswers(filteredAnswers);
            })
    }, [])

    return ( 
        <StyledMain>
            <Link to='/questions/allQuestions'><button><i className="bi bi-arrow-left"></i> Go back</button></Link>
            <div>
                <div className="heading">
                    <h1>{question.topic}</h1>
                    <p>{question.question}</p>
                </div>
                <div className="likes2">
                    <h4>Likes: {question.likes}</h4>
                    <h4>Asked: {question.asked}</h4>
                    <div className="buttons">
                        <button
                        onClick={() => navigate(`/questions/edit/question/${id}`)}
                        >Edit</button>
                        <button
                        onClick={() => {
                            setQuestions({type: QuestionsActionTypes.remove, id: id})
                            navigate('/questions/allQuestions')
                        }}
                        >Delete</button>
                    </div>
                </div>
                <div className="answer">
                    <h2>Answers:</h2>
                        {answers.map((answer) => (
                            <div key={answer.id} className="answer2">
                                <div>
                                    <p>{answer.answer}</p>
                                </div>
                                <div className="likes">
                                    <h4>Likes: {answer.likes}</h4>
                                    <h4>Answered: {answer.answered}</h4>
                                    <div className="buttons">
                                        <button
                                        onClick={() => navigate(`/questions/edit/answer/${id}`)}
                                        >Edit</button>
                                        <button
                                            onClick={() => {
                                                setAnswer({type: AnswersActionTypes.remove, id: id})
                                                navigate('/questions/allQuestions')
                                            }}
                                        >Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </StyledMain>
     );
}
 
export default Question;