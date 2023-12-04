import './App.css';
import Header from './components/UI/header/header';
import {Routes, Route} from 'react-router-dom';
import Main from './components/pages/main/Main';
import Questions from './components/pages/questions/Questions';
import Footer from './components/UI/footer/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />}/>
        <Route path='questions'>
          <Route path='allQuestions' element={<Questions />}/>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
