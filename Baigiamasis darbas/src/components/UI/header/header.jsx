import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;

    padding: 20px 0;
    border-bottom: solid 2px #ffdd00;
    background-color: #191919;
    color: #ffffff;

    a.active {
        color: #ffdd00;
    }

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
                color: #ffffff;
                font-weight: 600;
                font-size: 16px;
            }
        }
    }

    .connect > button:first-of-type {
        border: 2px solid #ffdd00;
        padding: 10px 20px;
        background-color: #ffffff00;
        border-radius: 5px;

        > a {
            text-decoration: none;
            color: #ffdd00;
            font-weight: 600;
        }
    }

    .connect > button:last-of-type {
        padding: 10px 20px;
        background-color: #ffdd00;
        border: 2px solid #ffdd00;
        border-radius: 5px;

        > a {
            text-decoration: none;
            font-weight: 600;
            color: black;
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
                    <li><NavLink to='/'
                    className={({isActive}) => isActive ? 'active' : ''}
                    >Home</NavLink></li>
                    <li
                    className={({isActive}) => isActive ? 'active' : ''}
                    ><NavLink to='/questions/allQuestions'>Forum</NavLink></li>
                </ul>
            </nav>
            <div className='connect'>
                <button><NavLink to='/user/login' className={({isActive}) => isActive ? 'active' : ''}>Log In</NavLink></button>
                <button><NavLink to='/user/register' className={({isActive}) => isActive ? 'active' : ''}>Sign Up</NavLink></button>
            </div>
        </StyledHeader>
     );
}
 
export default Header;