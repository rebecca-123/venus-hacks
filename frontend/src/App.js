import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import "./App.css";
// import Home from "./Home";
// import Maternal Health from "./MaternalHealth";
// import Services from "./Services";

export default function App() {
  // Define state for data
  const[name, setName] = useState("");
  const[age, setAge] = useState("");
  const[systolicBP, setUpperBP] = useState("");
  const[diastolicBP, setLowerBP] = useState("");
  const[bloodSugar, setBloodSugar] = useState("");
  const[heartRate, setHeartRate] = useState("");
  const [showResults, setShowResults] = useState(false);

  const [data, setData] = useState({
    name: "",
    age: "",
    systolicBP: "",
    pdiastolicBP: "",
	bloodSugar: "",
	heartRate: ""
  });

  // Using useEffect to fetch data from API
  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5002/data")
      .then(res => res.json()) // Parse the response as JSON
      .then(data => {
        // Update state with the fetched data
        setData({
          name: data.name,
          age: data.age,
          systolicBP: data.systolicBP,
          diastolicBP: data.diastolicBP,
		      bloodSugar: data.bloodSugar,
		      heartRate: data.heartRate,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once

  const handleSubmit = (event) => {
	event.preventDefault();
	console.log("Name:", name);
   	console.log("Age:", age);
   	console.log("Systolic BP:", systolicBP);
   	console.log("Diastolic BP:", diastolicBP);
   	console.log("Blood Sugar:", bloodSugar);
   	console.log("Heart Rate:", heartRate);
	setShowResults(true);
    
    // Navigate to another page
    //history.push('/results.js');
  }
  return (
    <p1>Help</p1>
    //   <div className="App">
    //     <header className="App-header">
    //       <h1>MaterniCheck</h1>
    //       {/* User input form */}
		// <Navbar></Navbar>
		// <br></br>
		// <form onSubmit={handleSubmit}>
		// 	<div className="body-box">
		// <p>Name: </p>
		// <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
		// <p>Age: </p>
		// <input type="text" value={age} onChange={(e) => setAge(e.target.value)}/>
		// <p>Upper Value of Blood Pressure (mmHG): </p>
		// <input type="text" value={systolicBP} onChange={(e) => setUpperBP(e.target.value)}/>
		// <p>Lower Value of Blood Pressure (mmHg): </p>
		// <input type="text" value={diastolicBP} onChange={(e) => setLowerBP(e.target.value)}/>
		// <p>Blood glucose levels (mmol/L): </p>
		// <input type="text" value={bloodSugar} onChange={(e) => setBloodSugar(e.target.value)}/>
		// <p>Heart Rate: </p>
		// <input type="text" value={heartRate} onChange={(e) => setHeartRate(e.target.value)}/>
		// </div>
		// <input type="submit"/>
		// </form>
		// {showResults && (
    //       <div className="results-box">
    //         <h2>Results</h2>
    //         <p>Name: {name}</p>
    //         <p>Age: {age}</p>
    //         <p>Systolic BP: {systolicBP}</p>
    //         <p>Diastolic BP: {diastolicBP}</p>
    //         <p>Blood Sugar: {bloodSugar}</p>
    //         <p>Heart Rate: {heartRate}</p>
    //       </div>
    //     )}
    //     {/* <Route path="/about" element={About/>}/>
    //     <Route path="/about" element={Maternal Health/>}/>
    //     <Route path="/about" element={Services/>}/> */}
    //     </header>
		// </div>
  );
}
