import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledButton = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    > button {
        position: absolute;
        top: 50px;
        right: 20px;
        font-size: 16px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: 10px;
        color: #ffdd00;
        background-color: #ffffff00;
        font-weight: 600;
    }

    > button:hover {
        text-decoration: underline;
    }

    > button.active {
        background-color: #ffdd003a;
    }
`

const SortQuestions = ({onSort}) => {

    const [questions, setQuestions] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        fetch(`http://localhost:8080/questions`)
        .then((res) => res.json())
        .then((data) => {
                setQuestions(data);
            })
            .catch((error) => {
                console.error("Error fetching answers:", error);
            });
    }, []);

    const handleSort = () => {
        const sortedQuestions = [...questions];

        sortedQuestions.sort((a, b) => {
            const dateA = new Date(a.asked);
            const dateB = new Date(b.asked);

            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setQuestions(sortedQuestions);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        onSort(sortedQuestions);
    };

    return ( 
        <StyledButton>
            <button onClick={handleSort} className={sortOrder === "asc" ? "active" : ""}>
                Sort by Date
            </button>
        </StyledButton>
     );
}
 
export default SortQuestions;