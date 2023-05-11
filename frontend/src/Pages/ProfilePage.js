import React, { useState, useEffect } from 'react';
import useAuth from '../Authorization/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../API/Api';

const ProfilePage = () => {

    const [profile, setProfile] = useState(null)
    const navigate = useNavigate();
    const { login, accessToken, refreshToken, isAuthenticated } = useAuth();
      
    useEffect(() => {
        const fetchProfile = async (token = accessToken) => {
            const response = await fetch('http://localhost:8000/myprofile', {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            if (response.status === 401) {
                // Access token is expired or invalid, try refreshing it
                const newAccessToken = await api.getNewAccessToken(refreshToken, login);
    
                if (newAccessToken) {
                    // Retry the request with the new access token
                    return fetchProfile(newAccessToken);
                } else {
                    // Refresh token is also expired or invalid, redirect to the login page
                    navigate('/login')
                }
            } else {
                const data = await response.json();
                console.log(data)
                setProfile(data);
            }
        };

        if (!isAuthenticated) {
            navigate('/login')
        }
        else {
            fetchProfile();
        }
        
        return () => {
            return
        };
    }, []);

    if (profile === null) {
        return(
            <div>Loading ...</div>
        )
    }
    

    return(
        <div className='profile-container mt-3 px-2'>
            <h2>My Profile</h2>
            <div>
                <strong>Username: </strong>{profile.username}
            </div>
            <div>
            <strong>Email: </strong>{profile.email}
            </div>
        </div>
    )
};

export default ProfilePage
