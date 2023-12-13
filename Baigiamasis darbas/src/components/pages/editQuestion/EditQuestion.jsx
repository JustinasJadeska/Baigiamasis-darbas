import {Formik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import FormikInput from '../../UI/input/FormikInput';
import { useContext, useEffect, useState } from 'react';
import ForumQuestionsContext from '../../../contexts/QuestionsContext';
import { Link, useNavigate, useParams } from 'react-router-dom';

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

const EditQuestion = () => {

    const {setQuestions, QuestionsActionTypes} = useContext(ForumQuestionsContext)
    const navigate = useNavigate();
    const {id} = useParams();

    const [formValues, setFormValues] = useState({
        topic: '',
        question: ''
    })

    useEffect(() => {
        fetch(`http://localhost:8080/questions/${id}`)
        .then(res => res.json())
        .then( data => {
            if(!data.topic){
                navigate('/')
            }
            setFormValues({
                ...data
            })
        })
    }, [id, navigate])

    const validationSchema = Yup.object({
        topic: Yup.string()
        .min(5, 'Minimum length 5 symbols ma friend')
        .max(50, 'Maximum length 50 symbols ma friend')
        .required('This field must be filled')
        .trim(),
        question: Yup.string()
        .min(5, 'Minimum length 5 symbols ma friend')
        .required('This field must be filled')
        .trim()
    })

    return ( 
        <StyledMain>
            <Link to={`/questions/${id}`}><button><i className="bi bi-arrow-left"></i> Go back</button></Link>
            <h1>Edit Question</h1>
                {
                    formValues.topic && <Formik
                    initialValues = {formValues}
                    validationSchema = {validationSchema}
                    onSubmit = {(values) => {
                        const finalValues = {
                            ...values
                        }
                        finalValues.modified = true;
                        finalValues.modifiedDate = new Date().toLocaleString();
                        setQuestions({
                            type: QuestionsActionTypes.edit,
                            id: id,
                            data: finalValues
                        });
                        setTimeout(() => {
                            navigate(`/questions/${id}`);
                          }, 0); 
                    }}
                    >
                        {(props) => (
                        <form onSubmit={props.handleSubmit}>
                            <FormikInput 
                                type='text'
                                name='topic'
                                formik={props}
                                placeholder='Enter question topic'
                            />
                            <FormikInput 
                                type='textarea'
                                name='question'
                                formik={props}
                                placeholder='Enter your question'
                                rows={5}
                                cols={22}
                            />
                            <input type="submit" value="Edit" />
                        </form>
                    )} 
                </Formik>
                }
        </StyledMain>
     );
}
 
export default EditQuestion;