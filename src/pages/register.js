import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put("/api/auth", {
                name,
                email,
                password,
            })

            setMessage(response.data.message);
            setName("");
            setEmail("");
            setPassword("");
        } catch(error) {
            setMessage(error.response.data.message)
        }
    };

    return (
        <div>
            <h1>
                Register
            </h1>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default RegisterForm