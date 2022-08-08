import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Context from './components/ContextApi';
import { ContextApi } from './components/ContextApi';
import Header from './components/Header';
import Main from './components/Main';
import SongFooter from './components/SongFooter';

function App() {
  return (
    <BrowserRouter>
    <ContextApi>
      <div className='wrapper'>
        <Header />
        <Main />
        <SongFooter />
      </div>
    </ContextApi>
    </BrowserRouter>
  );
}

export default App;
