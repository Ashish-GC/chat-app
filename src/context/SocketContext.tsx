'use client'

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io,Socket } from "socket.io-client";


interface SocketContextType {
    socket: Socket | undefined;
    setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>;
  }
  
  
  export const socketContext = createContext<SocketContextType | undefined>(undefined);
  
  
  export function SocketProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
  
    const socketInstance = useMemo(() => io(process.env.NEXT_PUBLIC_NEXT_URL || 'http://localhost:3000'), []);
               
  
    useEffect(() => {
      setSocket(socketInstance);
    }, [socketInstance]);
  
    return (
      <socketContext.Provider value={{ socket, setSocket }}>
        {children}
      </socketContext.Provider>
    );
  }


// Custom hook to use the socket context
export function useSocket() {
    const context = useContext(socketContext);
    if (context === undefined) {
      throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
  }