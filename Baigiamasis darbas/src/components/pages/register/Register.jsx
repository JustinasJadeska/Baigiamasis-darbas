import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
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

const Register = () => {

    const navigate = useNavigate();
    const {users, setUsers, UsersActionTypes, setLoggedInUser} = useContext(UsersContext);
    const [failedRegister, setFailedRegister] = useState({
        email: '',
        name: ''
    })

    const formValues = {
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        image: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string()
        .min(5, 'Minimum length 5 symbols')
        .max(20, 'Maximum length 20 symbols')
        .required('This field must be filled')
        .trim(),
        email: Yup.string()
        .email('Must be a valid email')
        .required('This field must be filled')
        .trim(),
        password: Yup.string()
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
            'Password must be 5-20 length, contain at least one uppercase, one lowercase, one number and one special symbol'
        )
        .required('This field must be filled')
        .trim(),
        passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('This field must be filled')
        .trim(),
        image: Yup.string()
        .url('Field must be a valid url')
        .required('This field must be filled')
        .trim()
    })

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(users.find(user => user.name === values.name)){
                setFailedRegister(prevState => {
                    return {
                        ...prevState,
                        name: 'User with such name already exists'
                    }
                })
            } else {
                setFailedRegister(prevState => {
                    return {
                        ...prevState,
                        name: ''
                    }
                })
            }
            if (users.find(user => user.email === values.email)){
                setFailedRegister(prevState => {
                    return {
                        ...prevState,
                        email: 'User with such email already exists'
                    }
                })
            } else {
                setFailedRegister(prevState => {
                    return {
                        ...prevState,
                        email: ''
                    }
                })
            }
            if(!users.find(user => user.name === values.name) && !users.find(user => user.email === values.email)){
                const workingUser = {
                        id: uuid(),
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        image: values.image
                }
                setUsers({
                    type: UsersActionTypes.add,
                    data: workingUser
                })
                setLoggedInUser(workingUser);
                navigate('/');
            }
        }
    })

    return ( 
        <StyledLogin>
            <h1>Sign Up</h1>
            <form onSubmit={formik.handleSubmit}>
                <FormikInput 
                type='text'
                name='name'
                formik={formik}
                placeholder='Create a user name...'
                />
                <FormikInput 
                type='email'
                name='email'
                formik={formik}
                placeholder='Enter your email'
                />
                <FormikInput 
                type='password'
                name='password'
                formik={formik}
                placeholder='Create password'
                />
                <FormikInput 
                type='password'
                name='passwordRepeat'
                formik={formik}
                placeholder='Repeat your password'
                />
                <FormikInput 
                type='url'
                name='image'
                formik={formik}
                placeholder='Add your avatar picture...'
                />
                <input type="submit" value="Sign Up" />
            </form>
            {
                failedRegister.name && <p>{failedRegister.name}</p>
            }
            {
                failedRegister.email && <p>{failedRegister.email}</p>
            }
        </StyledLogin>
    );
}
 
export default Register;