import { useContext, useEffect } from "react";
import styled from "styled-components";
import UsersContext from "../../../contexts/UsersContext";

const StyledProfile = styled.div`
    min-height: 100vh;
    color: white;
    background-color: #191919;

    > h1 {
        text-align: center;
        margin: 0;
        padding: 20px;
        color: #ffdd00;
    }

    .user {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 20px;

        > div > img {
            width: 250px;
        }
    }
`

const MyProfile = () => {

    const {users, setUsers, loggedInUser, UsersActionTypes} = useContext(UsersContext);

    useEffect(() => {
        fetch(`http://localhost:8080/users`)
        .then(res => res.json())
        .then(data => {
            setUsers({
                type: UsersActionTypes.get_all,
                data: data
            })
        })
    },[])

    const currentUser = users.find(user => user.id === loggedInUser.id)
    
    if(!currentUser){
        return <div>Loading...</div>
    }

    return ( 
        <StyledProfile>
            <h1>My Profile</h1>
            <div className="user">
                <div>
                    <img src={currentUser.image} alt='Profile picture' />
                </div>
                <div>
                    <p>Username: {currentUser.name}</p>
                    <p>Email: {currentUser.email}</p>
                </div>
            </div>
        </StyledProfile>
     );
}
 
export default MyProfile;
