import { createContext, useContext, useState} from "react";

const AuthContext = createContext();

/* Add an interface for the user object type */


export function AuthProvider({children}) {
    
    const [user, setUser] = useState<object | null>(null);
}