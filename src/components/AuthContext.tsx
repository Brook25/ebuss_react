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
        const getUserStatus = async () {
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
                console.error("User detail could not be retreived.", error);
            }
            finally() {
              setLoading(false);
            }
        }
    getUserStatus();        
    }, []);

    const login = async (credentials) => {
      const response = await fetch('http://127.0.0.1/playground/token', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      const {accessToken, userData} = await response.json();
      setUser(userData);
      localStorage.setItem('accessToken', accessToken);
    };

    const logout = async () => {
      localStorage.removeItem('accessToken');
      setUser(null);
    };

    return (
      <AuthContext.Provider value={{usr, login, logout, loading}}>
        {!loading ? children : <div>Page Loading...</div>}
      </AuthContext>
    )  
}

export default useAuth = () => useContext(AuthContext);