import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledCard = styled.div`
    border: 2px solid #ffdd00;
    border-radius: 5px;
    padding: 10px;

    width: 50%;
    margin: 0 auto;

    > p {
        line-height: 150%;
    }
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #ffffff;

    :hover {
        color: #ffdd00;
    }
`

const QuestionCard = ({data}) => {
    return ( 
        <StyledCard>
            <StyledLink to={`/questions/${data.id}`}><h1>{data.name}</h1></StyledLink>
            <p>{data.question}</p>
        </StyledCard>
     );
}
 
export default QuestionCard;