import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/auth/", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            setMessage("");
            setEmail("");
            setPassword("");

            window.location.href = "/book";
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h1>
                Login
            </h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default LoginForm
