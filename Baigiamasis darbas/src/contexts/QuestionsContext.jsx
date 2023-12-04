import { createContext, useEffect, useReducer } from "react";

const ForumQuestionsContext = createContext();

const QuestionsActionTypes = {
    get_all: 'get all questions',
    add: 'add questions',
    remove: 'remove questions',
    edit: 'edit questions'
}

const reducer = (state, action) => {
    switch(action.type){
        case QuestionsActionTypes.get_all :
            return state;
        case QuestionsActionTypes.add :
            fetch(`http://localhost:8080/questions`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(action.data)
            });
            return [...state, action.data];
        case QuestionsActionTypes.remove :
            fetch(`http://localhost:8080/questions/${action.id}`, {method: "DELETE"})
            return state.filter(el => el.id.toString() !== action.id.toString());
        case QuestionsActionTypes.edit :
            fetch(`http://localhost:8080/questions/${action.id}`, {
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

const ForumQuestionsProvider = ({children}) => {

    const [questions, setQuestions] = useReducer(reducer, [])

    useEffect(() => {
        fetch(`http://localhost:8080/questions`)
        .then(res => res.json())
        .then(data => setQuestions({
            type: QuestionsActionTypes.get_all,
            data: data
        })
        )
    }, [])

    return (
        <ForumQuestionsContext.Provider
            value={{
                questions,
                setQuestions,
                QuestionsActionTypes
            }}
        >
            {children}
        </ForumQuestionsContext.Provider>
    )
}

export {ForumQuestionsProvider}
export default ForumQuestionsContext;