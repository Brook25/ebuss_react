import  React, { useEffect, useState }  from "react";
import { userAuth } from "./AuthContext";
import { useParams } from 'react-router-dom';
import ProductDisplay from "./ProductsDisplay";
import { ProductType } from "./Products";
import Post, { PostType } from "./Post";
import Posts from "./Posts";
// import {}

interface UserDataType {
  posts: Array<PostType>,
  backgroundImage: string,
  profilePicture: string,
  products: Array<ProductType>,
  subscribers: {username: string, id: number, profilePicture: string}[],
  subscriptions: {username: string, id: number, profilePicture: string}[],
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  id: number,
  isSupplier: boolean,
  customerMetric?: {
    recurrentCustomers: {username: string, id: number, profilePicture: string}[]
  },
  productMetric?: {
    yearlyMetrics: {month: number, revenue: number, sales: number}[],
  },
  createdAt: string,
  updatedAt: string
}

interface UserProfileType {

}


export default function UserProfile() {

  
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<UserDataType | null>(null);

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
        <div className="user-identity-container">
          <span>{profileData?.firstName} {profileData?.lastName}</span>
          <img src={profileData?.backgroundImage} alt="Background" className="background-image" />
          <img src={profileData?.profilePicture} alt={`${profileData?.username}'s profile picture`} className="profile-picture" />
          <span>{profileData?.username}</span>
          {isMyProfile && <button>Edit Profile</button>}
          {profileData?.isSupplier &&
            <div className="IsSupplier-container">
            <span>Supplier</span><i></i>
            </div>}
          <div className="user-products">    /* resize this container */
            {profileData?.products.map((product: ProductType) => (
              <ProductDisplay productData={product} />
            ))
            }
          </div>
          <div className="user-posts">
            {profileData?.posts && <Posts posts={profileData.posts} />}
          </div>
          <div className="subscriptions">
            <h3>Subscriptions</h3>
            {profileData?.subscriptions.map((subscription) => (
              <div className="subscription" key={subscription.id}>
                <img src={subscription.profilePicture} alt={subscription.username} />
                <span>{subscription.username}</span>
              </div>
            ))}
          </div>
           {profileData?.isSupplier && 
          <div className="subscribers">
            <h3>Subscribers</h3>
            {profileData?.subscribers.map((subscriber) => (
              <div className="subscriber" key={subscriber.id}>
                <img src={subscriber.profilePicture} alt={subscriber.username} />
                <span>{subscriber.username}</span>
              </div>
            ))}
            </div>
            isMyProfile && }
        </div>
      </div>
    )
} 





