import styled from "styled-components";

const StyledDiv = styled.div`

    > label {
        font-weight: 600;
    }

    > input,
    > textarea {
        margin-top: 5px;
        padding: 10px 20px;
        border: 1px solid #ae00ff;
        border-radius: 5px;
        width: 100%;
        box-sizing: border-box;
    }

    > input[type=date] {
        box-sizing: border-box;
        cursor: pointer;
        padding: 10px 50px;
    }

    > input:hover {
        border: 2px solid #ae00ff;
    }

    > textarea:hover{
        border: 2px solid #ae00ff;
    }
`

const FormikInput = ({type, name, formik, placeholder, rows, cols}) => {
    const isTextarea = type === 'textarea'
    return ( 
        <StyledDiv>
            <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label><br />
            {isTextarea ? (
                <textarea 
                    type={type} 
                    name={name} 
                    id={name}
                    value={formik.values[name]} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={placeholder ? placeholder : ''}
                    rows={rows}
                    cols={cols}
                />
            ) : (
                <input 
                    type={type} 
                    name={name} 
                    id={name}
                    value={formik.values[name]} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={placeholder ? placeholder : ''}
                />
            )}
            {
                formik.touched[name] && formik.errors[name] &&
                <p>{formik.errors[name]}  
                </p>
            }
        </StyledDiv>
     );
}
 
export default FormikInput;