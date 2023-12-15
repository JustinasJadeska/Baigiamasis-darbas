import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    padding: 20px 0;
    border-top: solid 2px #ffdd00;
    background-color: #191919;
    color: #ffffff;

    .footer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 10px;

        > div {
            display: flex;
            align-items: center;
            gap: 10px;
            
            > img {
            width: 50px;
            height: auto;
        }

        .logoName {
            font-weight: 600;
            font-size: 18px;

            > span {
                color: #ffdd00;
            }
        }
        }
    }

    .footer > nav > ul {
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

    .bi {
        font-size: 20px;
        padding-left: 10px;
    }

    .rights {
        text-align: center;
    }
`

const Footer = () => {
    return ( 
        <StyledFooter>
            <div className="footer">
                <div>
                    <img src="https://cdn2.iconfinder.com/data/icons/spring-flat-11/272/spring-bee-insect-honey-nectar-fly-bug-512.png" alt="logo image" />
                    <span className='logoName'>FORUM<span>BEE</span></span>
                </div>
                <div>
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-github"></i>
                    <i className="bi bi-twitter-x"></i>
                </div>
                <nav>
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/questions/allQuestions'>Forum</NavLink></li>
                    </ul>
                </nav>
            </div>
            <div className="rights">
                <p>©2023 Forumbee. All rights reserved</p>
            </div>
        </StyledFooter>
     );
}
 
export default Footer;