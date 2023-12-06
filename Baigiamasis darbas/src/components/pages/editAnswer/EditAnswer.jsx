import {Formik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import FormikInput from '../../UI/input/FormikInput';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ForumAnswersContext from '../../../contexts/AnswersContext';

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
        color: #ffdd00;
    }

    > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        > input {
            padding: 10px 20px;
            font-weight: 600;
            color: #000000;
            background-color: #ffdd00;
            border: 2px solid #ffdd00;
            border-radius: 5px;
            cursor: pointer;
        }

        > input:hover {
            background-color: #ffbf00;
            border: 2px solid #ffbf00;
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

const EditAnswer = () => {

    const {setAnswer, AnswersActionTypes} = useContext(ForumAnswersContext)
    const navigate = useNavigate();
    const {id} = useParams();

    const [formValues, setFormValues] = useState({
        answer: '',
        answered: ''
    })

    useEffect(() => {
        fetch(`http://localhost:8080/answers/${id}`)
        .then(res => res.json())
        .then( data => {
            if(!data.answer){
                navigate('/')
            }
            setFormValues({
                ...data
            })
        })
    }, [])

    const validationSchema = Yup.object({
        answer: Yup.string()
        .min(5, 'Minimum length 5 symbols ma friend')
        .required('This field must be filled')
        .trim(),
        answered: Yup.date()
        .required('Date must be provided')
        .min(new Date(0).toISOString(), 'Date must be after 1970-01-01')
        .max(new Date().toISOString(), 'Date must be before now')
    })

    return ( 
        <StyledMain>
            <Link to={`/questions/${id}`}><button><i className="bi bi-arrow-left"></i> Go back</button></Link>
            <h1>Edit Answer</h1>
                {
                    formValues.answer && <Formik
                    initialValues = {formValues}
                    validationSchema = {validationSchema}
                    onSubmit = {(values) => {
                        const finalValues = {
                            ...values
                        }
                        setAnswer({
                            type: AnswersActionTypes.edit,
                            id: id,
                            data: finalValues
                        });
                        navigate(`/questions/allQuestions`) 
                    }}
                    >
                        {(props) => (
                        <form onSubmit={props.handleSubmit}>
                            {/* <FormikInput 
                                type='text'
                                name='topic'
                                formik={props}
                                placeholder='Enter question topic'
                            /> */}
                            <FormikInput 
                                type='textarea'
                                name='answer'
                                formik={props}
                                placeholder='Enter your answer'
                                rows={5}
                                cols={22}
                            />
                            <FormikInput 
                                type='date'
                                name='answered'
                                formik={props}
                            />
                            <input type="submit" value="Edit" />
                        </form>
                    )} 
                </Formik>
                }
        </StyledMain>
     );
}
 
export default EditAnswer;