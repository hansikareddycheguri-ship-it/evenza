import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/register", formData);

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div>
            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Register
                </button>
            </form>

            <p>{message}</p>

            <p>
                Already registered? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Register;