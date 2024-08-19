import {useAuth} from "@/hooks/useAuth.jsx";
import {useNavigate} from "react-router-dom";
import logo from "../assets/scavenger.png";
import {Tab} from "../components/pageTab.jsx";

export const Header = () => {

    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log("logout")
        logout();
        navigate("/");
    }

    return (
        <header className="w-full px-6 bg-white shadow-md dark:bg-zinc-800">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-5">
                    <img className="h-10" src={logo} alt="Squatch Hunter Logo"/>
                </div>
                <div className="flex items-center space-x-5">
                    {user && user.roles && user.roles.includes("ADMIN") && (
                        <Tab to="/admin">
                            Admin
                        </Tab>
                    )}
                    <Tab to="/games">
                        Games
                    </Tab>
                </div>
                <div className="flex items-center space-x-5">
                    <Tab onClick = { handleLogout } to="/">
                        Logout{user && " " + user.username}
                    </Tab>
                </div>
            </div>
        </header>
)
}