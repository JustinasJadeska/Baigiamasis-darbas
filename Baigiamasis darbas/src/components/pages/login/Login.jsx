import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from 'yup';
import FormikInput from "../../UI/input/FormikInput";
import { useContext, useState } from "react";
import UsersContext from "../../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

const StyledLogin = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    height: calc(100vh - 93px);
    box-sizing: border-box;
    background-color: #191919;
    color: white;

    > h1 {
        margin: 0;
        padding: 20px 0;
        color: #ae00ff;
    }

    > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        > input {
            padding: 10px 20px;
            font-weight: 600;
            color: #ffffff;
            background-color: #ae00ff;
            border: 2px solid #ae00ff;
            border-radius: 5px;
            cursor: pointer;
        }

        > input:hover {
            background-color: #ffbf00;
            border: 2px solid #ffbf00;
        }
    }
`

const Login = () => {

    const {users, setLoggedInUser} = useContext(UsersContext);
    const [failedLogin, setFailedLogin] = useState(false)
    const navigate = useNavigate();

    const formValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string()
        .email('Must be a valid email')
        .required('This field must be filled')
        .trim(),
        password: Yup.string()
        .required('This field must be filled')
        .trim()
    })

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
            const loggedInUser = users.find(user => user.email === values.email && user.password === values.password);

            if(loggedInUser){
                setLoggedInUser(loggedInUser)
                navigate('/')
            } else {
                setFailedLogin(true)
            }
        }
    })

    return ( 
        <StyledLogin>
            <h1>Log In</h1>
            <form onSubmit={formik.handleSubmit}>
                <FormikInput 
                type='email'
                name='email'
                formik={formik}
                placeholder='Enter your account email'
                />
                <FormikInput 
                type='password'
                name='password'
                formik={formik}
                placeholder='Enter your account password'
                />
                <input type="submit" value="Log In" />
            </form>
            {
                failedLogin && <p>No such user in our database</p>
            }
        </StyledLogin>
    );
}
 
export default Login;