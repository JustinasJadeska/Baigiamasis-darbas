import './App.css';
import Header from './components/UI/header/header';
import {Routes, Route} from 'react-router-dom';
import Main from './components/pages/main/Main';
import Footer from './components/UI/footer/Footer';
import AllQuestions from './components/pages/allQuestion/AllQuestions';
import Question from './components/pages/question/Question';
import AddQuestion from './components/pages/addQuestion/AddQuestion';
import EditQuestion from './components/pages/editQuestion/EditQuestion';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />}/>
        <Route path='questions'>
          <Route path='allQuestions' element={<AllQuestions />}/>
          <Route path=':id' element={<Question />} />
          <Route path='addNew' element={<AddQuestion />} />
          <Route path='edit/:id' element={<EditQuestion />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
