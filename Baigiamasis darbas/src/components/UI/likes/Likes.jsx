import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UsersContext from "../../../contexts/UsersContext";
import ForumQuestionsContext from "../../../contexts/QuestionsContext";


const Likes = () => {
    const [questionLikes, setQuestionLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const { id } = useParams();
    const {users} = useContext(UsersContext)
    const {questions} = useContext(ForumQuestionsContext)

    useEffect(() => {
        fetch(`http://localhost:8080/questions/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setQuestionLikes(data.likes || 0);
            setLiked(data.liked || false);
          })
          .catch((error) => {
            console.error('Error fetching question:', error);
          });
      }, [id]);
  
      const handleLike = () => {
        fetch(`http://localhost:8080/questions/${id}/likes`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: users.id }), // Add user information if needed
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setQuestionLikes(data.likes || 0);
            setLiked(true);
          })
          .catch((error) => {
            console.error('Error liking question:', error);
          });
      };
      
      const handleUnlike = () => {
        fetch(`http://localhost:8080/questions/${id}/likes`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setQuestionLikes(data.likes || 0);
            setLiked(false);
          })
          .catch((error) => {
            console.error('Error unliking question:', error);
          });
      };
  
    return (
      <div>
        <p>
          {questionLikes} {questionLikes === 1 ? 'Like' : 'Likes'}
        </p>
        {liked ? (
          <button onClick={handleUnlike}>Unlike</button>
        ) : (
          <button onClick={handleLike}>Like</button>
        )}
      </div>
    );
  };
  
  export default Likes;