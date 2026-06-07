import { createContext, useContext, useEffect, useState } from 'react';

interface notificationType {
  note: string,
  url: string,
  date: Date
}

const NotificationContext = createContext();

export function NotificationProvider( { children }: { children: React.ReactNode } ) {
    const [notifications, setNotifications] = useState<Array<notificationType>>([]);
    useEffect(() => {
      
      const getNotifications = async function () {
        try {
        const data = await fetch('https://localhost:8000/notifications');
        if (!data.ok) {
          console.log("Newer notifications could not be fetched.");
          return;
        } 
        const newNotifications = await data.json() as Array<notificationType>;
        setNotifications((prev) => [...newNotifications, ...prev]);
      } 
      catch (error) {
        console.error("An error occurred while fetching notifications.", error);
      }
    }
    getNotifications();
    }, [])
    return (
      <NotificationContext.Provider value={{notifications, setNotifications}}>
        {children}
      </NotificationContext.Provider>
    )
}

export const useNotifcations = () => useContext(NotificationContext);