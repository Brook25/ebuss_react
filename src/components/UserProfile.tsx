import  React, { useEffect, useState }  from "react";
import { userAuth } from "./AuthContext";
import { useParams } from 'react-router-dom';
// import {}


export default function UserProfile() {

    const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<Object>({});

    const user = userAuth()?.user || null; 
    useEffect(() => {
      let isMounted = true;
      (async() => {
        const { identifier } = useParams();
        const response = await fetch(`https://127.0.0.1/profile/${identifier}`);
        if (!isMounted) return;
        
        if (!response.ok) {
          console.log("Couldn\'t load profile data.", response.status);
          return;
        }
        const userData = await response.json();
        userData.id === user?.id && setIsMyProfile(true); 
        setProfileData(userData);
      });
      return () => {
        isMounted = false;
      }
    }, [profileData]);

    return (
      <div className="user-profile-container">
        
      </div>
    )
} 





