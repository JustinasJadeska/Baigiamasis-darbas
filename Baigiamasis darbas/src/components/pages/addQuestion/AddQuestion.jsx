import {useFormik} from 'formik';
import * as Yup from 'yup';
import {v4 as uuid} from 'uuid';
import styled from 'styled-components';
import FormikInput from '../../UI/input/FormikInput';
import { useContext, useEffect } from 'react';
import ForumQuestionsContext from '../../../contexts/QuestionsContext';
import { Link, useNavigate } from 'react-router-dom';
import UsersContext from '../../../contexts/UsersContext';

const StyledMain = styled.main`
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
            color: white;
            background-color: #ae00ff;
            border: 2px solid #ae00ff;
            border-radius: 5px;
            cursor: pointer;
        }

        > input:hover {
            background-color: #6f00a3;
            border: 2px solid #6f00a3;
        }
    }

    > a > button {
        position: absolute;
        top: 10px;
        left: 10px;
        padding: 10px 20px;
        font-weight: 600;
        color: #ffdd00;
        background-color: #ffdd0000;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .bi {
        font-size: 18px;
        font-weight: 600;
    }
`

const AddQuestion = () => {

    const {setQuestions, QuestionsActionTypes} = useContext(ForumQuestionsContext)
    const navigate = useNavigate();
    const {loggedInUser} = useContext(UsersContext);

    const values = {
        topic: '',
        question: ''
    }

    const validationSchema = Yup.object({
        topic: Yup.string()
        .min(5, 'Minimum length 5 symbols ma friend')
        .max(50, 'Maximum length 500 symbols')
        .required('This field must be filled')
        .trim(),
        question: Yup.string()
        .min(5, 'Minimum length 5 symbols ma friend')
        .max(1000, 'Maximum length 1000 symbols')
        .required('This field must be filled')
        .trim()
    })

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const finalValues = {
                id: uuid(),
                userid: loggedInUser.id,
                ...values,
                likes: 0,
                modified: false,
                modifiedDate: new Date().toLocaleString(),
                asked: new Date().toLocaleString()
            }
            setQuestions({
                type: QuestionsActionTypes.add,
                data: finalValues
            });
        }
    })

    useEffect(() => {
        if (formik.submitCount > 0) {
            navigate('/questions/allQuestions');
        }
    }, [formik.submitCount, navigate]);

    return ( 
        <StyledMain>
            <Link to='/questions/allQuestions'><button><i className="bi bi-arrow-left"></i> Go back</button></Link>
            <h1>Ask a Question</h1>
            <form onSubmit={formik.handleSubmit}>
                <FormikInput 
                type='text'
                name='topic'
                formik={formik}
                placeholder='Enter question topic'
                />
                <FormikInput 
                type='textarea'
                name='question'
                formik={formik}
                placeholder='Enter your question'
                rows={5}
                cols={22}
                />
                <input type="submit" value="Ask" disabled={!formik.isValid}/>
            </form>
        </StyledMain>
     );
}
 
export default AddQuestion;