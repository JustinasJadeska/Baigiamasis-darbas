import './App.css';
import Header from './components/UI/header/header';
import {Routes, Route} from 'react-router-dom';
import Main from './components/pages/main/Main';
import Footer from './components/UI/footer/Footer';
import AllQuestions from './components/pages/allQuestion/AllQuestions';
import Question from './components/pages/question/Question';
import NewQuestion from './components/pages/addQuestion/AddQuestion';
import AddQuestion from './components/pages/addQuestion/AddQuestion';

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
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
