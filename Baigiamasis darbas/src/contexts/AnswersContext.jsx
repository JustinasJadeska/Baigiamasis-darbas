import { createContext, useEffect, useReducer } from "react";

const ForumAnswersContext = createContext();

const AnswersActionTypes = {
    get_all: 'get all answers',
    add: 'add answers',
    remove: 'remove answers',
    edit: 'edit answers'
}

const reducer = (state, action) => {
    switch(action.type){
        case AnswersActionTypes.get_all :
            return state;
        case AnswersActionTypes.add :
            fetch(`http://localhost:8080/answers`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(action.data)
            });
            return [...state, action.data];
        case AnswersActionTypes.remove :
            fetch(`http://localhost:8080/answers/${action.id}`, {method: "DELETE"})
            return state.filter(el => el.id.toString() !== action.id.toString());
        case AnswersActionTypes.edit :
            fetch(`http://localhost:8080/answers/${action.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(action.data)
            });
            return state.map(el =>{
                if(el.id.toString() === action.id.toString()){
                    return {...action.data};
                } else {
                    return el;
                }
            })
        default:
            console.log('error, action types is not found', action.type)
            return state;
    }
}

const ForumAnswersProvider = ({children}) => {

    const [answers, setAnswers] = useReducer(reducer, [])

    useEffect(() => {
        fetch(`http://localhost:8080/answers`)
        .then(res => res.json())
        .then(data => setAnswers({
            type: AnswersActionTypes.get_all,
            data: data
        })
        )
    }, [])

    return (
        <ForumAnswersContext.Provider
            value={{
                answers,
                setAnswers,
                AnswersActionTypes
            }}
        >
            {children}
        </ForumAnswersContext.Provider>
    )
}

export {ForumAnswersProvider}
export default ForumAnswersContext;