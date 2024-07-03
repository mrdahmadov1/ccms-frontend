import { BrowserRouter } from 'react-router-dom';
import Router from './pages/router';
import './assets/css/reset.css';
import './assets/css/global.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
