import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UsersContext from "../../../contexts/UsersContext";
import FormikInput from "../../UI/input/FormikInput";

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
        align-items: center;
        justify-content: center;
        gap: 20px;

        > div > img {
            width: 250px;
        }
    }

    .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        > p {
            margin: 10px 0;
        }
    }

    .loading {
        min-height: 100vh;
        color: white;
        background-color: #191919;
    }
`

const MyProfile = () => {

    const {users, setUsers, loggedInUser, UsersActionTypes} = useContext(UsersContext);
    // const [aboutMe, setAboutMe] = useState("");

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
        return <div className="loading">Loading...</div>
    }

    // const aboutMeChange = (event) => {
    //     setAboutMe(event.target.value)
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault()

    //     const updateUser = {...currentUser, aboutMe}

    //     fetch(`http://localhost:8080/users/${loggedInUser.id}`,{
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type":"application/json"
    //         },
    //         body: JSON.stringify(updateUser)
    //     })
    //     .then(res => res.json())
    //     .then(updateUser => {
    //         setUsers({
    //             type: UsersActionTypes.get_all,
    //             data: updateUser
    //         })
    //     })

    // }

    return ( 
        <StyledProfile>
            <h1>My Profile</h1>
            <div className="user">
                <div>
                    <img src={currentUser.image} alt='Profile picture' />
                </div>
                <div className="info">
                    <p>Username: {currentUser.name}</p>
                    <p>Email: {currentUser.email}</p>
                    {/* <p>About me: </p>
                    <textarea
                    value={aboutMe}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    onChange={aboutMeChange}
                    >
                    </textarea><br />
                    <button onClick={handleSubmit}>Save</button> */}
                </div>
            </div>
        </StyledProfile>
     );
}
 
export default MyProfile;
