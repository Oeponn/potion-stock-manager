import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {Store} from './components/pages';
import './App.css';

const App = () => {
  const basename =
    process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : '';

  return (
    <div
      className="appContainer"
    >
      <BrowserRouter basename={basename}>
        <div className="pageContainer">
          <Routes>
            <Route path='/' element={<Store/>} />
            <Route path='/test' element={<div>Test</div>} />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
};

export default App;
