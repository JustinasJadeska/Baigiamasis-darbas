import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { ForumQuestionsProvider } from './contexts/QuestionsContext';
import { ForumAnswersProvider } from './contexts/AnswersContext';
import { UsersProvider } from './contexts/UsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ForumQuestionsProvider>
        <ForumAnswersProvider>
            <UsersProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UsersProvider>
        </ForumAnswersProvider>
    </ForumQuestionsProvider>
);