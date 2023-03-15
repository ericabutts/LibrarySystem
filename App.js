import logo from './logo.svg';
import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { Home} from './pages/Home';
import { Administrator } from './pages/Administrator';
import { Reader } from './pages/Reader';
import { AddNewReader } from './pages/subpages/AddNewReader';
import { AddNewDocument } from './pages/subpages/AddNewDocument';


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
        <Route path="/addnewreader" element={<AddNewReader/>}>
        </Route>
        <Route path="/addnewdocument" element={<AddNewDocument/>}>
        </Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
