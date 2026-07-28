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
    <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
    >
        <div className="card shadow p-4" style={{ width: "400px" }}>
            <h2 className="text-center mb-4">
                Create an Account 🚀
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="btn btn-success w-100"
                >
                    Register
                </button>
            </form>

            {message && (
                <div className="alert alert-info mt-3">
                    {message}
                </div>
            )}

            <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login">
                    Login
                </Link>
            </p>
        </div>
    </div>
);
}

export default Register;