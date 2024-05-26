import React, { useState } from "react";
import axios from 'axios';

function MaternalRiskForm() {
    
    const [inputs, setInputs] = useState({
      fname: '',
      age: '',
      sbp: '',
      dbp: '',
      bs: '',
      hr: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const [riskLevel, setRiskLevel] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault(); // prevent page refresh
      const data = {
        Age: parseInt(inputs.age),
        SystolicBP: parseInt(inputs.sbp),
        BS: parseFloat(inputs.bs),
        HeartRate: parseInt(inputs.hr),
      };
      try {
        console.log(data);
        await axios.post('http://localhost:5002/api/maternal/predict', data).then(
          function(response){
            // fetch and update displayed data
            setSubmitted(true);
            if(response.data['high risk'] > 0.85){
              setRiskLevel('high');
            } else if (response.data['high risk'] > 0.70){
              setRiskLevel('moderate');
            } else {
              setRiskLevel('low');
            }
            console.log(response);
          }
        );
      } catch (error) {
        console.error('Error creating data:', error);
      }
    };

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
      console.log(inputs)
    }

    return (
          <div>
          <form onSubmit={handleSubmit}>
            <p>Name: </p>
            <input type="text" name='fname' value={inputs.fname} onChange={handleChange}/>
            <p>Age: </p>
            <input type="text" name='age' value={inputs.age} onChange={handleChange}/>
            <p>Upper Value of Blood Pressure (mmHG): </p>
            <input type="text" name='sbp' value={inputs.sbp} onChange={handleChange}/>
            <p>Lower Value of Blood Pressure (mmHg): </p>
            <input type="text" name='dbp' value={inputs.dbp} onChange={handleChange}/>
            <p>Blood glucose levels (mmol/L): </p>
            <input type="text" name='bs' value={inputs.bs} onChange={handleChange}/>
            <p>Heart Rate: </p>
            <input type="text" name='hr' value={inputs.hr} onChange={handleChange}/>
            <button type="submit">Calculate Risk!</button>
          </form>
          {submitted && (
            <div className="results-box">
              <h2>Results</h2>
                <p>You are at {riskLevel} risk of pregnancy complications.</p>
            </div>
          )}
          </div>
    );
}

export default MaternalRiskForm;

