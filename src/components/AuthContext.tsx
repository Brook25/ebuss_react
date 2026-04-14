import { createContext, useContext, useState} from "react";

const AuthContext = createContext();

/* Add an interface for the user object type */
const userType = {
  firstName: string,
  lastName: string,
  username: string,
  id: number,
  email, string
}


export function AuthProvider({children}) {
    
    const [user, setUser] = useState<userType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkUserStatus = async () {
            cost token = localStorage.getItem('access_token');
            if (!token) {
              setLoading(false);
              return;
            }

            try {
              const response = await fetch('http://127.0.0.1/playground/auth/me', 
                { headers: {
                    'Authorization': `Bearer: ${token}`,
                    'Content-Type': 'application/json'     
                 }
                });

              if (response.ok) {
                const userData = await response.json();
                setUser(userData);
              }
              else{
                logout();
              }
            }

            catch (error) {
                console.log(error);
            }
    })
}