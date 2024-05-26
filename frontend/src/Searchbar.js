import React, { useState } from 'react';
import axios from 'axios';
import './Services.css';
import './Searchbar.css';



const SearchBar = () => {
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [results, setResults] = useState([]);

  const findLocations = async (event) => {
    event.preventDefault();
    if (!city && !zip && !state) {
        setErrorMessage("Please fill out at least one field");
        return;
      } else {
        setErrorMessage("");
      }
    try {
        console.log(state)
      // Perform your logic here, for example, making an API call with axios
      const response = await fetch(`http://localhost:5002/manual_providers?city=${city}&zip=${zip}&state=${state}`);
      // Assuming response.data contains the results from your API
      const data = await response.json()
      setResults(data);
      console.log(data)
      // Show results
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  return (
    <div className="Searchbar">
      <form onSubmit={findLocations}>
        <p>City: </p>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        <p>ZIP: </p>
        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
        <p>State: </p>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
        <button type="submit">Search</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      {showResults && (
        <div className="content-center">
          <h2 className="results">Results</h2>
          <ul>
          {results.map((result, index) => (
            // <div key={index}>
              <li>{result}</li>
            // </div>
          ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
