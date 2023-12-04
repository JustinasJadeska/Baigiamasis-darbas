import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;

    padding: 20px 0;
    border-bottom: solid 1px grey;

    > div {
        display: flex;
        align-items: center;
        gap: 10px;

        > img {
            width: 50px;
            height: auto;
        }

        > .logoName {
            font-weight: 600;
            font-size: 18px;

            > span {
                color: #ffdd00;
            }
        }
    }

    > nav > ul {
        display: flex;
        align-items: center;
        gap: 20px;

        > li {
            list-style-type: none;

            > a {
                text-decoration: none;
                color: black;
                font-weight: 600;
                font-size: 16px;
            }
        }
    }

    .connect > button {
        border: 2px solid #ffdd00;
        padding: 10px 20px;
        background-color: white;
        border-radius: 5px;

        > a {
            text-decoration: none;
            color: black;
            font-weight: 600;
        }
    }
`

const Header = () => {
    return ( 
        <StyledHeader>
            <div>
                <img src="https://cdn2.iconfinder.com/data/icons/spring-flat-11/272/spring-bee-insect-honey-nectar-fly-bug-512.png" alt="logo image" />
                <span className='logoName'>FORUM<span>BEE</span></span>
            </div>
            <nav>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/questions/allQuestions'>Forum</NavLink></li>
                </ul>
            </nav>
            <div className='connect'>
                <button><NavLink>Log In</NavLink></button>
                <button><NavLink>Register</NavLink></button>
            </div>
        </StyledHeader>
     );
}
 
export default Header;