import './App.css';
import Home from './pages/home'
import Login from './pages/login';
import { PAGES } from './constants/constants';
import { useState } from 'react';
import Header from './components/Header';
import NavMenu from './components/NavMenu';


function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.INITIAL);
  const [started, setStarted] = useState(false);
  
  const handleStart = () => {
    setStarted(true);
    setCurrentPage(PAGES.HOME);
  };

  return started ?(
    <div className="App">
      <Header/>
      <NavMenu/>
      <Home/>
    </div>
  ):(
    <Login onStart ={handleStart}/>
  );
}

export default App;
