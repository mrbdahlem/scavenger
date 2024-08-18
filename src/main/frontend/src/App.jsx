import { Routes, Route , Navigate} from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { Home } from "./pages/Home";
import { GamesPage } from "./pages/Games.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {AuthProvider} from "./hooks/useAuth.jsx";
import {SignUpPage} from "./pages/SignUp.jsx";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/games" element={
                    <ProtectedRoute redirect="/games">
                        <GamesPage />
                    </ProtectedRoute>
                } />
                <Route path="*" element={
                    <Navigate to="/" />
                }
                />
            </Routes>
        </AuthProvider>
    )
}

export default App
