import './App.css';
import Header from './components/UI/header/header';
import {Routes, Route} from 'react-router-dom';
import Main from './components/pages/main/Main';
import Footer from './components/UI/footer/Footer';
import AllQuestions from './components/pages/allQuestion/AllQuestions';
import Question from './components/pages/question/Question';
import AddQuestion from './components/pages/addQuestion/AddQuestion';
import EditQuestion from './components/pages/editQuestion/EditQuestion';
import EditAnswer from './components/pages/editAnswer/EditAnswer';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import AddAnswer from './components/UI/addAnswer/AddAnswer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />}/>
        <Route path='/questions'>
          <Route path='allQuestions' element={<AllQuestions />}/>
          <Route path=':id' element={<Question />} />
          <Route path='addNew' element={<AddQuestion />} />
          <Route path='edit/question/:id' element={<EditQuestion />} />
          <Route path='edit/answer/:id' element={<EditAnswer />} />
          {/* <Route path='addAnswer/:id' element={<AddAnswer />} /> */}
        </Route>
        <Route path='/user'>
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
