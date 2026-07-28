import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", formData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/");
            window.location.reload();
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "90vh" }}
        >
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">
                    Welcome Back 👋
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control mb-3"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>
                </form>

                {message && (
                    <div className="alert alert-danger mt-3">
                        {message}
                    </div>
                )}

                <p className="text-center mt-3">
                    New to Evenza?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;