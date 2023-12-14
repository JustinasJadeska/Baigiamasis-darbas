import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UsersContext from "../../../contexts/UsersContext";
import ForumQuestionsContext from "../../../contexts/QuestionsContext";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
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
        color: #ae00ff;
    }

    > div {
        border: 2px solid #ae00ff;
        border-radius: 5px;
        padding: 10px;

        width: 50%;
        margin: 0px auto 20px;
        background-color: #191919;

        > h1 {
            margin: 0;
        }

        > p {
            line-height: 150%;
        }
    }

    .noQuestions {
        line-height: 150%;
        text-align: center;
    }

    > a > button {
        font-weight: 600;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: 10px;
        color: #ae00ff;
        background-color: #ffffff00;
        margin-bottom: 20px;
    }

    > a > button:hover {
        text-decoration: underline;
    }
`

const MyQuestions = () => {

    const {loggedInUser} = useContext(UsersContext);
    const [sortedQuestions, setSortedQuestions] = useState([]);
    const {questions, setQuestions, QuestionsActionTypes} = useContext(ForumQuestionsContext)

    useEffect(() => {
        fetch(`http://localhost:8080/questions`)
        .then(res => res.json())
        .then(data => {
            setQuestions({
                type: QuestionsActionTypes.get_all,
                data: data
            })
        })
    }, [])

    useEffect(() => {
        if (loggedInUser && questions.length > 0) {
            const userQuestions = questions.filter((question) => question.userid === loggedInUser.id);
            setSortedQuestions(userQuestions);
        } else {
            setSortedQuestions([]);
        }
    }, [loggedInUser, questions]);

    return ( 
        <StyledDiv>
            <h1>My Questions</h1>
            {loggedInUser && sortedQuestions.length === 0 ? (
                <p className="noQuestions">No questions yet? Feel free to ask!</p>
            ) : (
                sortedQuestions.map((question) => (
                    <div key={question.id}>
                        <h1>{question.topic}</h1>
                        <p>{question.question}</p>
                        <p>Asked: {question.asked}</p>
                        <p>Likes: {question.likes}</p>
                    </div>
                ))
            )}
            {
                loggedInUser && <Link to='/questions/addNew'><button><i className="bi bi-plus-lg"></i> Ask Question</button></Link>
            }
        </StyledDiv>
    );
}
 
export default MyQuestions;