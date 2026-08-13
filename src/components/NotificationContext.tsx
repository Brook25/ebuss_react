import { createContext, useContext, useEffect, useState, useRef } from 'react';

export interface notificationType {
  note: string,
  url: string,
  date: Date,
  type: string,
  status: 'success' | 'failed' | 'pending'
}

export interface notificationContextType {
  notifications: {notifications: notificationType[], newCount: number},
  clearIdempotencyKey: () => void,
  resetIdempotencyKey: () => void,
  getIdempotencyKey: () => null | string
}

const NotificationContext = createContext<undefined | notificationContextType>(undefined);

export function NotificationProvider( { children }: { children: React.ReactNode } ) {
    const [notifications, setNotifications] = useState<{ notifications: Array<notificationType>, newCount: number }>({notifications: [], newCount: 0});
    let idempotencyKey = useRef<null | string>(null);
    
    useEffect(() => {
      
      const getNotifications = async function () {
        try {
        const data = await fetch('https://localhost:8000/notifications');
        if (!data.ok) {
          console.log("Newer notifications could not be fetched.");
          return;
        } 
        const newNotifications = await data.json() as Array<notificationType>;
        const allPaymentSuccess = newNotifications.filter((notification) => (notification.type === 'payment')).every((notification) => notification.status === 'success');
        (allPaymentSuccess && idempotencyKey) && (idempotencyKey.current = null);
        setNotifications((prev) => ({...newNotifications, ...prev}));
      } 
      catch (error) {
        console.error("An error occurred while fetching notifications.", error);
      }
    }
    getNotifications();
    }, [])

    const resetIdempotencyKey = () => {
      idempotencyKey.current = crypto.randomUUID();
    }

    const clearIdempotencyKey = () => {
      idempotencyKey.current = null;
    }

    const getIdempotencyKey = () => {
      return idempotencyKey.current;
    } 
    return (
      <NotificationContext.Provider value={{notifications, resetIdempotencyKey, clearIdempotencyKey, getIdempotencyKey}}>
        {children}
      </NotificationContext.Provider>
    )
}

export const useNotifications = () => useContext(NotificationContext);