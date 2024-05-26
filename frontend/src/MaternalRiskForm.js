import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Maternal.css";



const MaternalRiskForm = () => {
  // Define state for form inputs
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [systolicBP, setUpperBP] = useState("");
  const [diastolicBP, setLowerBP] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Define state for results
  const [results, setResults] = useState({
    name: "",
    age: "",
    systolicBP: "",
    diastolicBP: "",
    bloodSugar: "",
    heartRate: ""
  });

  // Handle form submission
  const calculateRisk = (event) => {
    event.preventDefault();
    // Log form data (you can replace this with actual risk calculation logic)
    console.log("Name:", name);
    console.log("Age:", age);
    console.log("Systolic BP:", systolicBP);
    console.log("Diastolic BP:", diastolicBP);
    console.log("Blood Sugar:", bloodSugar);
    console.log("Heart Rate:", heartRate);
    
    // Update results state
    setResults({
      name,
      age,
      systolicBP,
      diastolicBP,
      bloodSugar,
      heartRate
    });
    // Show results
    setShowResults(true);
  };

  return (
    <div className = "MaternalRiskForm">
      <header className = "MaternalRiskForm-header" >
        <h1>MaterniCheck</h1>
      <Navbar />
      <h2>Maternal Health</h2>
      <form onSubmit={calculateRisk}>
        <p>Name: </p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <p>Age: </p>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        <p>Upper Value of Blood Pressure (mmHG): </p>
        <input type="text" value={systolicBP} onChange={(e) => setUpperBP(e.target.value)} />
        <p>Lower Value of Blood Pressure (mmHg): </p>
        <input type="text" value={diastolicBP} onChange={(e) => setLowerBP(e.target.value)} />
        <p>Blood glucose levels (mmol/L): </p>
        <input type="text" value={bloodSugar} onChange={(e) => setBloodSugar(e.target.value)} />
        <p>Heart Rate: </p>
        <input type="text" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {showResults && (
        <div className="results-box">
          <h2 className = "results">Results</h2>
          <p className="results-p">Name: {results.name}</p>
          <p className="results-p">Age: {results.age}</p>
          <p className="results-p">Systolic BP: {results.systolicBP}</p>
          <p className="results-p">Diastolic BP: {results.diastolicBP}</p>
          <p className="results-p">Blood Sugar: {results.bloodSugar}</p>
          <p className="results-p">Heart Rate: {results.heartRate}</p>
        </div>
      )}
      </header>
    </div>
  );
};

export default MaternalRiskForm;
