import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>}
                />
                <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />

            </Routes>
            <footer className="bg-dark text-white text-center py-3 mt-5">
    © 2026 Evenza • Built with React, Express & MongoDB
</footer>
        </BrowserRouter>
    );
}

export default App;