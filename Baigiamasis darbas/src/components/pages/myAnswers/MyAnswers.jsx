import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import UsersContext from "../../../contexts/UsersContext";
import ForumAnswersContext from "../../../contexts/AnswersContext";
import ForumQuestionsContext from "../../../contexts/QuestionsContext";

const StyledAnswers = styled.div`
    min-height: 100vh;
    color: white;
    background-color: #191919;

    display: flex;
    flex-direction: column;
    align-items: center;

    > h1 {
        font-size: 38px;
        margin: 0;
        text-align: center;
        padding: 20px;
        color: #ffdd00;
    }

    > div {
        border: 2px solid #ffdd00;
        border-radius: 5px;
        padding: 10px;

        width: 50%;
        margin: 0px auto 20px;
        background-color: #191919;

        > h1 {
            margin: 0;
            color: #ae00ff;
        }

        > p {
            line-height: 150%;
        }
    }

    .noQuestions {
        line-height: 150%;
        text-align: center;

        > a {
            font-weight: 600;
            text-decoration: none;
            color: #ae00ff;
        }

        > a:hover {
            text-decoration: underline;
        }
    }

    .answer {
        color: #ffdd00;
        font-weight: 600;
    }

    .topic {
        color: #ffdd00;
    }
`

const MyAnswers = () => {

    const {loggedInUser} = useContext(UsersContext);
    const [sortedAnswers, setSortedAnswers] = useState([]);
    const {answer, setAnswer, AnswersActionTypes} = useContext(ForumAnswersContext);
    const {questions, setQuestions} = useContext(ForumQuestionsContext)

    useEffect(() => {
        fetch(`http://localhost:8080/answers`)
            .then(res => res.json())
            .then(data => {
                setAnswer({
                    type: AnswersActionTypes.get_all,
                    data: data
                });
    
                if (loggedInUser && data.length > 0) {
                    const userAnswers = data
                        .filter(answer => answer.userId === loggedInUser.id)
                        .map(answer => {
                            const relatedQuestion = questions.find(question => question.id === answer.questionId);
                            return {
                                ...answer,
                                topic: relatedQuestion ? relatedQuestion.topic : "Unknown Topic"
                            };
                        });
    
                    setSortedAnswers(userAnswers);
                } else {
                    setSortedAnswers([]);
                }
            });
    
        fetch(`http://localhost:8080/questions`)
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
            });
    }, [loggedInUser, AnswersActionTypes, setAnswer, setQuestions, questions]);
    
    return ( 
        <StyledAnswers>
            <h1>My Answers</h1>
            {loggedInUser && sortedAnswers.length === 0 ? (
                <p className="noQuestions">No answers yet? <br /> Go to <NavLink to='/questions/allQuestions'>Forum</NavLink> and answer any question you want!</p>
            ) : (
                sortedAnswers.map((answer) => (
                    <div key={answer.id}>
                        <h1><span className="topic">Topic: </span>{answer.topic}</h1>
                        <p><span className="answer">Your answer: </span>{answer.answer}</p>
                        <p><span className="answer">Answered: </span> {answer.answered}</p>
                        <p><span className="answer">Likes: </span> {answer.likes}</p>
                    </div>
                ))
            )}
        </StyledAnswers>
    );
}
 
export default MyAnswers;