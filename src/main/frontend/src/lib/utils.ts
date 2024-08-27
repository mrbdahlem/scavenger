import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}


export function hms(ms) {
    // Convert to seconds:
    let seconds = ms / 1000;
    // Extract hours:
    let hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // Extract minutes:
    let minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // Keep only seconds not extracted to minutes:
    seconds = parseInt(seconds % 60);
    return hours.toString().padStart(2, "0") + ":" + (minutes.toString().padStart(2, "0")) + ":" + seconds.toString().padStart(2, "0");
}

const az = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-";

export function shortUUID(uuid) {
    const uid = uuid.replace(/-/g, "");
    const msb = "0x" + uid.substring(0, 16);
    const lsb = "0x" + uid.substring(16);

    let msbInt = BigInt(msb);
    let lsbInt = BigInt(lsb);

    const str = longToString(msbInt) + longToString(lsbInt);
    console.log(uuid, str);
    return str;
}

function longToString(value) {
    const initval = value;
    let result = "";
    for (let i = 0; i < 11; i++) {
        
        result = az.charAt(Number(BigInt.asUintN(6, value))) + result;
        value = value / 64n;
    }
    return result;
}