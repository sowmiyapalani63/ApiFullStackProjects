import React from 'react';
import { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import { Spinner } from 'react-bootstrap';
function App() {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setIsLoading(false); 
    }, 1000); 

    return () => clearTimeout(timeout); 
  }, []);

  return (
    <BrowserRouter>
     <div className="App">
      
      {isLoading ? (
        <div className="spinner-container d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" className='primary-color spinner-border'>
          </Spinner>
        </div>
      ) : (
        <Routes>      
          <Route path="/" element={<Home />} />
        </Routes>
      )}
      
    </div>
    </BrowserRouter>
   
  );
}

export default App;
