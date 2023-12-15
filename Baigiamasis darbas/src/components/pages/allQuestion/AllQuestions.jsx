import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import QuestionCard from "../questionCard/QuestionCard";
import UsersContext from "../../../contexts/UsersContext";
import SortQuestions from "../../UI/sortQuestions/SortQuestions";

const StyledQuestions = styled.div`
    min-height: 100vh;
    position: relative;
    background-color: #191919;
    color: white;
    
    > h1 {
        font-size: 48px;
        margin: 0;
        text-align: center;
        padding: 20px 0 20px 0;
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
        font-weight: 600;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: 10px;
        color: #ae00ff;
        background-color: #ffffff00;
    }

    > a > button:hover {
        text-decoration: underline;
    }

    .filter-buttons {
        display: flex;
        gap: 10px;
        align-items: flex-start; 
        flex-wrap: wrap;
        padding-top: 20px;
        padding-left: 20px;
        flex-direction: row; 
    }

    .filter-buttons  button {
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: 10px;
        color: #ae00ff;
        background-color: #ffffff00;
        font-weight: 600;
    }

    .filter-buttons  button:hover {
        text-decoration: underline;
    }

    .filter-buttons button.active {
        background-color: #ae00ff42;
    }
`
const AllQuestions = () => {

    const {loggedInUser} = useContext(UsersContext);
    const [filterType, setFilterType] = useState('all');
    const [allAnswers, setAllAnswers] = useState([]);
    const [sortedQuestions, setSortedQuestions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/answers`)
        .then((res) => res.json())
        .then((data) => {
                setAllAnswers(data);
            })
            .catch((error) => {
                console.error("Error fetching answers:", error);
            });
    }, []);

    const handleSort = (sortedQuestions) => {
        setSortedQuestions(sortedQuestions);
    };

    const filteredQuestions = () => {
        if (filterType === 'answered') {
            return sortedQuestions.filter((question) =>
                allAnswers.some((answer) => answer.questionId === question.id)
            );
        } else if (filterType === 'unanswered') {
            return sortedQuestions.filter((question) =>
                !allAnswers.some((answer) => answer.questionId === question.id)
            );
        } else {
            return sortedQuestions;
        }
    };

    return ( 
        <StyledQuestions>
            {
                loggedInUser && <Link to='/questions/addNew'><button><i className="bi bi-plus-lg"></i> Ask Question</button></Link>
            }
            
            <div className="filter-buttons">
                <button onClick={() => setFilterType('all')} className={filterType === 'all' ? 'active' : ''}>
                    All
                </button>
                <button
                    onClick={() => setFilterType('answered')}
                    className={filterType === 'answered' ? 'active' : ''}
                >
                    Answered
                </button>
                <button
                    onClick={() => setFilterType('unanswered')}
                    className={filterType === 'unanswered' ? 'active' : ''}
                >
                    Unanswered
                </button>
            </div>
            <h1>Questions</h1>
            <SortQuestions
                onSort={handleSort}
            />
            <div>
                {
                    filteredQuestions().map(question => {
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