import { useState } from 'react';

function UserInputForm() {
    const [input, setInput] = useState('');
    const [submittedInput, setSubmittedInput] = useState('');

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmittedInput(input);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter something:
                    <input type="text" value={input} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            {submittedInput && (
                <div>
                    <h2>You submitted:</h2>
                    <p>{submittedInput}</p>
                </div>
            )}
        </div>
    );
}

export default UserInputForm;
