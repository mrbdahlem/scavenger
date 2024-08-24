import logo from '../assets/scavenger.png';
import {cn} from "@/lib/utils.ts";

export const BigLogo = ({className}) => {
    return (
        <>
            <img src={logo} className={cn("max-h-[100px] lg:max-h-[400px]", className)} alt="icon"/>
        </>
    )
};

export default BigLogo;