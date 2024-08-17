import logo from '../assets/scavenger.png';
import { useAuth } from "../hooks/useAuth.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
    const { user } = useAuth();
    return (
        <div className={"flex flex-row items-center min-h-screen min-w-full"}>
            <img src={logo} className="max-h-[400px]" alt="icon"/>
            <div>{user && user.username} Home</div>
            <Link to="/game">Game</Link>
        </div>
    )
}

export default Home;