import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { Home } from "./pages/Home";
import { GamePage } from "./pages/Game.jsx";

import logo from './assets/scavenger.png';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {AuthProvider} from "./hooks/useAuth.jsx";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/game" element={
                    <ProtectedRoute redirect="/game">
                        <GamePage />
                    </ProtectedRoute>
                } />
            </Routes>
        </AuthProvider>
    )
}

export default App
