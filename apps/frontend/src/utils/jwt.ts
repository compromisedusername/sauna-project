
import {jwtDecode }from 'jwt-decode';
interface User {
  id: number;
  role: string;
  email: string;
}

export function getRoleFromToken(token: string){
    if(!token){

    console.log(" TOKEN IS NULL")
        return "guest";
    }
try{
        const decoded = jwtDecode<User>(token);
        return decoded.role || "guest";
    }catch(error){
        return "guest";
    }
}
