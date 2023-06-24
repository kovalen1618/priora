import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

// Styles
import './Signup.css';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const { signup, isPending, error } = useSignup();

    const handleInputFocus = (e) => {
        const inputs = document.querySelectorAll(".input");

        inputs.forEach(input => input.classList.remove('focused'));

        if (e) {
            e.target.classList.add('focused')
        }
    
        if (e && e.target.id === 'name-input') {
            e.target.placeholder = '';
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        signup(email, password, displayName);
    }

    return (
        <form onSubmit={handleSubmit} className='form'>
            <label>
                <input 
                    className="input"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName} 
                    onFocus={handleInputFocus}
                    onBlur = {() => {handleInputFocus()}}
                    required
                />
                <div></div>
            </label>
            <label>
                <input 
                    className="input"
                    type="email" 
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur = {() => {handleInputFocus()}}
                    value={email}
                    required
                />
                <div></div>
            </label>
            <label>
                <input 
                    className="input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur = {() => {handleInputFocus()}}
                    value={password}
                    required
                />
                <div></div>
            </label>
            { !isPending && <button>Signup</button>}
            { isPending && <button disabled>Loading...</button>}
            { error && <p>{ error }</p>}
        </form>
    )
}