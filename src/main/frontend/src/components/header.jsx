import {useAuth} from "@/hooks/useAuth.jsx";
import {useNavigate} from "react-router-dom";
import logo from "../assets/scavenger.png";
import {Tab} from "../components/pageTab.jsx";
import {cn} from "@/lib/utils";

export const Header = ({ children, className}) => {

    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log("logout")
        logout();
        navigate("/");
    }

    return (
        <header className="fixed top-0 left-0 right-0 px-6 bg-white shadow-md dark:bg-zinc-800 z-50">
            <div className="flex items-center justify-between">
                <div className="flex flex-row items-center">
                    <img className="h-10" src={logo} alt="Squatch Hunter Logo"/>{
                    user && user.roles && user.roles.includes("ADMIN") && (
                        <Tab to="/admin">
                            Admin
                        </Tab>
                    )}
                    <Tab to="/games">
                        Games
                    </Tab>
                    <Tab to="/tags">
                        Tags
                    </Tab>

                </div>
                <div className={cn("flex items-center space-x-5", className)}>
                    { children }
                </div>
                <div className="flex items-center">
                    <Tab onClick = { handleLogout } to="/">
                        Logout&nbsp;{user &&  user.username}
                    </Tab>
                </div>
            </div>
        </header>
)
}