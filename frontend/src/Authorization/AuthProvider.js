import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:8000/get_user/',{
                    method: "GET",
                    credentials: 'include'
                });
                console.log(response)
                if (!response.ok)
                    return
                
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                setUser(null)
            }
        };

        fetchUserInfo();
    }, []);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
