import React, { useState, useEffect } from "react";

function MaternalRiskForm() {

    function calculateRisk(){

    }

    return (
          <form onSubmit={calculateRisk}>
            <p>Name: </p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <p>Age: </p>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)}/>
            <p>Upper Value of Blood Pressure (mmHG): </p>
            <input type="text" value={systolicBP} onChange={(e) => setUpperBP(e.target.value)}/>
            <p>Lower Value of Blood Pressure (mmHg): </p>
            <input type="text" value={diastolicBP} onChange={(e) => setLowerBP(e.target.value)}/>
            <p>Blood glucose levels (mmol/L): </p>
            <input type="text" value={bloodSugar} onChange={(e) => setBloodSugar(e.target.value)}/>
            <p>Heart Rate: </p>
            <input type="text" value={heartRate} onChange={(e) => setHeartRate(e.target.value)}/>
            <button type="submit"></button>
          </form>
          {showResults && (
            <div className="results-box">
              <h2>Results</h2>
              <p>Name: {name}</p>
              <p>Age: {age}</p>
              <p>Systolic BP: {systolicBP}</p>
              <p>Diastolic BP: {diastolicBP}</p>
              <p>Blood Sugar: {bloodSugar}</p>
              <p>Heart Rate: {heartRate}</p>
            </div>
          )}
    );
}

export default MaternalRiskForm;