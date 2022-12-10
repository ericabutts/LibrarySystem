import logo from './logo.svg';
import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { Home} from './pages/Home';
import { Administrator } from './pages/Administrator';
import { Reader } from './pages/Reader';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path="/administrator" element={<Administrator/>}>
        </Route>
        <Route path="/reader" element={<Reader/>}>
        </Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
