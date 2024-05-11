import logo from './logo.svg';
import './App.css';

import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';

const Atom = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Potion Manager
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const App = () => {
  return (
    <div
      className="appContainer"
    >
      <BrowserRouter basename="/potion-stock-manager">
        <div className="pageContainer">
          <Routes>
            <Route path='/' element={<Atom/>} />
            <Route path='/test' element={<div>Test</div>} />
          </Routes>
        </div>
        {/* <Header /> */}
      </BrowserRouter>

    </div>
  );
};

export default App;
