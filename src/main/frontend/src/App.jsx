import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route , Navigate} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { GamesPage } from "./pages/GamesPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {AuthProvider} from "./hooks/useAuth.jsx";
import {SignUpPage} from "@/pages/SignUpPage.jsx";
import {AdminPage} from "@/pages/Admin.jsx";
import {GamePage} from "@/pages/GamePage.jsx";
import {TagPage} from "@/pages/TagPage.jsx";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/games" element={
                    <ProtectedRoute redirect="/games">
                        <GamesPage />
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute redirect="/admin">
                        <AdminPage />
                    </ProtectedRoute>
                } />
                <Route path="/game" element={
                    <ProtectedRoute redirect="/game">
                        <GamePage />
                    </ProtectedRoute>
                } />
                <Route path="/tag/:id" element={<TagPage />} />
                <Route path="*" element={
                    <Navigate to="/" />
                } />
            </>
        ));

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}

export default App
