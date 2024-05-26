import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./App.css";

export default function App() {
  
  useEffect(() => {
    fetch("http://localhost:5002")
      .then(res => res.json())
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to MaterniCheck!</h1>
          <h2>Designed to guide women through their maternal concerns.</h2>
          <h3>Get Started</h3>
          <Navbar />
        </header>
      </div>
  );
}
