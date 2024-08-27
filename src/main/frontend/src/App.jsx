import {lazy, Suspense} from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route , Navigate} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {AuthProvider} from "./hooks/useAuth.jsx";
import {TagPage} from "@/pages/TagPage.jsx";
import { HomePage } from "@/pages/HomePage.jsx";
import { PlayerProvider } from "./hooks/usePlayer.jsx";
import { PlayPage } from "./pages/PlayPage.jsx";
import { StatsPage } from "./pages/StatsPage.jsx";

const SignUpPage = lazy(() => import("@/pages/SignUpPage.jsx"));
const AdminPage = lazy(() => import("@/pages/Admin.jsx"));
const GamesPage = lazy(() => import("@/pages/GamesPage.jsx"));
const GamePage = lazy(() => import("@/pages/GamePage.jsx"));
const LoginPage = lazy(() => import("@/pages/LoginPage.jsx"));
const WatchPage = lazy(() => import("@/pages/WatchPage.jsx"));
const TagsPage = lazy(() => import("@/pages/TagsPage.jsx"));

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={
                    <Suspense>
                        <LoginPage />
                    </Suspense>} />
                <Route path="/signup" element={
                    <Suspense>
                        <SignUpPage />
                    </Suspense>
                } />
                <Route path="/games" element={
                    <ProtectedRoute redirect="/games">
                        <Suspense>
                            <GamesPage />
                        </Suspense>
                    </ProtectedRoute>
                } />
                <Route path="/watch/:gameId" element={
                    <ProtectedRoute redirect="/games">
                        <Suspense>
                            <WatchPage />
                        </Suspense>
                    </ProtectedRoute>
                } />
                <Route path="/tags" element={
                    <ProtectedRoute redirect="/tags">
                        <Suspense>
                            <TagsPage />
                        </Suspense>
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute redirect="/admin">
                        <Suspense>
                            <AdminPage />
                        </Suspense>
                    </ProtectedRoute>
                } />
                <Route path="/game" element={
                    <ProtectedRoute redirect="/game">
                        <Suspense>
                            <GamePage />
                        </Suspense>
                    </ProtectedRoute>
                } />
                <Route path="/tag/:hash" element={<TagPage />} />
                <Route path="/play" element={<PlayPage />} />
                <Route path="/stats/:player" element={<StatsPage />} />
                <Route path="*" element={
                    <Navigate to="/" />
                } />
            </>
        ));

    return (
        <AuthProvider>
            <PlayerProvider>
                <RouterProvider router={router} />
            </PlayerProvider>
        </AuthProvider>
    )
}

export default App
