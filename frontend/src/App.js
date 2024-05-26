import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Navbar";
import Home from "./home";
import MaternalRiskForm from "./MaternalRiskForm";
import Services from "./Services";
import "./App.css";

export default function App() {
  
  useEffect(() => {
    fetch("http://localhost:5002/data")
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
