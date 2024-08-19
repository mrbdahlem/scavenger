import {Link, useLocation} from "react-router-dom";
import {cn} from "@/lib/utils.ts";

export const Tab = ({to, onClick, children, className}) => {
    const location = useLocation();

    className = cn(className, "p-4");
    if (location.pathname === to) {
        className = cn(className, "bg-slate-800 dark:bg-zinc-300 text-white dark:text-black");
    }
    return (
        <div className={className}>
            <Link to={to} onClick={onClick} className={className} >
                {children}
            </Link>
        </div>
    );
}