import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login'
import Chat from './pages/Chat'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Chat/>}/>
        </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
