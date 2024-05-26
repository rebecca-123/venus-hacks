import React from "react";
import Navbar from "./Navbar";
import './Services.css';
import {useState} from 'react';
import SearchBar from './Searchbar';



const Services = () => {
  return (
    <div className = "Services">
      <header className = "Services-header">
      <h1>MaterniCheck</h1>
          <Navbar />
      <h2>Services</h2>
      <p>Enter your city, state, & zip code to find nearby services</p>
      <SearchBar />
      </header>
    </div>
  );
};

export default Services;
