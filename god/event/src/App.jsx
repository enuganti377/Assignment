import { Routes, Route } from "react-router-dom";

import Navbar from "./assets/components/Navbar.jsx";
import ProtectedRoute from "./assets/components/ProtectedRoute.jsx";

import Login from "./assets/pages/Login.jsx";
import Signup from "./assets/pages/Signup.jsx";
import Dashboard from "./assets/pages/Dashboard.jsx";
import Events from "./assets/pages/Events.jsx";
import MyEvents from "./assets/pages/Myvents.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/event" element={<Events />} />
          <Route path="/myevents" element={<MyEvents />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
