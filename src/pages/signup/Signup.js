import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

// Assets
import eyeShowIcon from '../../assets/password-show-eye-icon.svg';
import eyeHideIcon from '../../assets/password-hide-eye-icon.svg';

// Styles
import './Signup.css';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [displayName, setDisplayName] = useState('');

    const { signup, isPending, error } = useSignup();

    const handleInputFocus = (e) => {
        const inputs = document.querySelectorAll(".signup-input");

        inputs.forEach(input => input.classList.remove('focused'));

        if (e) {
            e.target.classList.add('focused')
        }
    }
    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        signup(email, password, displayName);
    }

    return (
        <form onSubmit={handleSubmit} className='form'>
            <label>
                <input 
                    className="signup-input"
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
                    className="signup-input"
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
                    className="signup-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur = {() => {handleInputFocus()}}
                    value={password}
                    required
                />
                <div></div>
                <img 
                    className="password-icon"
                    src={showPassword ? eyeShowIcon : eyeHideIcon}
                    onClick={handleTogglePassword} 
                    alt="Hide/Show Password Icon"
                />
            </label>
            { !isPending && <button>Signup</button>}
            { isPending && <button disabled>Loading...</button>}
            { error && <p>{ error }</p>}
        </form>
    )
}