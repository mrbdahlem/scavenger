import {useAuth} from "@/hooks/useAuth.jsx";
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/scavenger.png";

export const Header = () => {

    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log("logout")
        logout();
        navigate("/");
    }

    return (
        <header className="w-full py-4 px-6 bg-white shadow-md dark:bg-zinc-800">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-5">
                    <img className="h-10" src={logo} alt="Squatch Hunter Logo"/>
                </div>
                <div className="flex items-center space-x-5">
                    {user.roles && user.roles.includes("ADMIN") && (
                        <Link to="/admin">
                            Admin
                        </Link>
                    )}
                    <Link to="/games">
                        Games
                    </Link>
                </div>
                <div className="flex items-center space-x-5">
                    <Link onClick = { handleLogout } to="/">
                        Logout{user && " " + user.username}
                    </Link>
                </div>
            </div>
        </header>
)
}