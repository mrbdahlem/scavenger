import { useAuth } from "../hooks/useAuth";

export const GamesPage = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <div className={"flex flex-row items-center min-h-screen min-w-full"}>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}