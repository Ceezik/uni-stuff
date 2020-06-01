import React, { createContext, useContext, useState, useEffect } from 'react';
const socketIo = require('socket.io-client');

const SocketContext = createContext();

/**
 * Contexte permettant de communiquer avec le serveur de jeu partout dans le code
 */
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const s = socketIo(
            `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`
        );

        s.on('connect', () => setConnected(true));
        s.on('disconnect', () => setConnected(false));
        setSocket(s);
        setLoading(false);
    }, []);

    return (
        <SocketContext.Provider value={{ socket, connected }}>
            {!loading && children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
