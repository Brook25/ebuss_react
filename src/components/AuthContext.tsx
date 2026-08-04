import { createContext, useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* Add an interface for the user object type */
export interface userType {
  firstName: string,
  lastName: string,
  username: string,
  id: number,
  email: string
}

export interface AuthContextType {
  user: userType | null;
  login: (credentials: { email: string, password: string }) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export function AuthProvider({children}: {children: React.ReactNode}) {
    
    const [user, setUser] = useState<userType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getUserStatus = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
              setLoading(false);
              return;
            }
            const navigate = useNavigate();
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
              else if (response.status === 401) {
                logout();
                navigate('/login', { state: { error: "User not Authorized. Please log in."} })
              }
            }
            catch (error) {
                console.error("User detail could not be retreived.", error);
            }
            finally {
              setLoading(false);
            }
        }
    getUserStatus();        
    }, []);

    const login = async (credentials: { email: string, password: string}) => {
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
      <AuthContext.Provider value={{user, login, logout, loading}}>
        {!loading ? children : <div>Page Loading...</div>}
      </AuthContext.Provider>
    )  
}

export const userAuth = () => useContext(AuthContext);