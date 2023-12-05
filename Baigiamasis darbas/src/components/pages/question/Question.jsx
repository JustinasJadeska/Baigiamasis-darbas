import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";



const Question = () => {

    const {id} = useParams();
    const [question, setQuestion] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/questions/${id}`)
        .then(res => res.json())
        .then(data => setQuestion(data))
    }, [])

    return ( 
        <main>
            <div>
                <h1>{question.name}</h1>
                <p>{question.question}</p>
            </div>
            <div>
                <p>Likes: {question.likes}</p>
            </div>
        </main>
     );
}
 
export default Question;