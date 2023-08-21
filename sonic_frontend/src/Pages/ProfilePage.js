import React, { useState, useEffect } from 'react';
import useAuth from '../Authorization/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../API/Api';

const ProfilePage = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    if (user === null) {
        navigate('/login')
    }

    return(
        <div className='profile-container mt-3 px-2'>
            <h2>My Profile</h2>
            <div>
                <strong>Username: </strong>{user.username}
            </div>
            <div>
            <strong>Email: </strong>{user.email}
            </div>
        </div>
    )
};

export default ProfilePage
