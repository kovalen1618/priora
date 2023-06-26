import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

// Assets
import eyeShowIcon from '../../assets/password-show-eye-icon.svg';
import eyeHideIcon from '../../assets/password-hide-eye-icon.svg';

// Styles
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { login, isPending, error } = useLogin();

    const handleInputFocus = (e) => {
        const inputs = document.querySelectorAll(".login-input");

        inputs.forEach(input => input.classList.remove('focused'));

        if (e) {
            e.target.classList.add('focused')
        }
    
        if (e && e.target.id === 'name-input') {
            e.target.placeholder = '';
        }
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        login(email, password);
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <label>
                <input 
                    className="login-input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    onFocus={handleInputFocus}
                    onBlur = {() => {handleInputFocus()}}
                    required
                 />
                 <div></div>
            </label>
            <label>
                <input 
                    className="login-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} 
                    onFocus={handleInputFocus}
                    onBlur = {() => {handleInputFocus()}}
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
            { !isPending && <button>Login</button> }
            { isPending && <button disabled>Loading...</button> }
            { error && <p>{ error }</p> }
        </form>
    )
}