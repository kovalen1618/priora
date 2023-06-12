import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";



export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const { signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();

        signup(email, password, displayName);
    }

    return (
        <form onSubmit={handleSubmit} className="">
            <h2>Signup</h2>
            <label>
                <span>Name</span>
                <input 
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName} 
                />
            </label>
            <label>
                <span>Email</span>
                <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password</span>
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} 
                />
            </label>
            { !isPending && <button>Signup</button>}
            { isPending && <button disabled>Loading...</button>}
            { error && <p>{ error }</p>}
        </form>
    )
}