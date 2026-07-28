import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import MyBookings from "./pages/MyBookings";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                path="/events/:id" element={<EventDetails />}
                />
                <Route path="/my-bookings" element={<MyBookings />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;