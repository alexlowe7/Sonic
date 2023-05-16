import React, { useState, useEffect } from 'react';
import useAuth from '../Authorization/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../API/Api';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DEFAULT_INTERVALS, INTERVAL_LISTEN_MODES } from '../Helpers/Helpers';
import { Row } from 'react-bootstrap';

const Dashboard = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    const [userStats, setUserStats] = useState(null);
    const [time, setTime] = useState('All time');
    const [interval, setInterval] = useState('All');
    const [ascDesc, setAscDesc] = useState('All');

    const [correct, setCorrect] = useState(null);
    const [incorrect, setIncorrect] = useState(null);
    const [percentage, setPercentage] = useState(null);

    useEffect(() => {
        let totalCorrect = 0;
        let totalIncorrect = 0;

        if (userStats === null) {
            return;
        }
        
        if (interval === 'All' && ascDesc === 'All') {
            userStats['stats'].forEach((stat) => {
                DEFAULT_INTERVALS.forEach((intervalType) => {
                    INTERVAL_LISTEN_MODES.forEach((listenType) => {
                        totalCorrect += stat[intervalType][listenType].correct;
                        totalIncorrect += stat[intervalType][listenType].incorrect;
                    });
                });
            });
        } else if (interval === 'All' && ascDesc !== 'All') {
            userStats['stats'].forEach((stat) => {
                DEFAULT_INTERVALS.forEach((intervalType) => {
                    totalCorrect += stat[intervalType][ascDesc].correct;
                    totalIncorrect += stat[intervalType][ascDesc].incorrect;
                });
            });
        } else if (interval !== 'All' && ascDesc === 'All') {
            userStats['stats'].forEach((stat) => {
                INTERVAL_LISTEN_MODES.forEach((listenType) => {
                    totalCorrect += stat[interval][listenType].correct;
                    totalIncorrect += stat[interval][listenType].incorrect;
                });
            });
        } else {
            userStats['stats'].forEach((stat) => {
                totalCorrect += stat[interval][ascDesc].correct;
                totalIncorrect += stat[interval][ascDesc].incorrect;
            });
        }


        setCorrect(totalCorrect);
        setIncorrect(totalIncorrect);
        const total = totalCorrect + totalIncorrect
        const percentage = ((totalCorrect / total) * 100).toFixed(1)
        setPercentage(percentage)
        
    }, [ascDesc, interval, userStats])

    useEffect(() => {
        async function getUserStats() {
            const stats = await api.getUserStats();
            setUserStats(stats);
        }
        // if (user === null) {
        //     navigate('/login')
        // }
        getUserStats();
    }, [])

    const handleIntervalChange = (event) => {
        setInterval(event.target.value);
    }

    const handleAscDescChange = (event) => {
        setAscDesc(event.target.value);
    }

    return(
        user !== null ? 
        (
        <div className='profile-container mt-3 px-2'>
            <h2>{user.username}'s Stats</h2>
            <div>
                {userStats === null ? 
                (
                <div>Loading ... </div>
                )
                : (
                <>
                    <FormControl fullWidth className='mt-3'>
                        <InputLabel id="interval">Interval Type</InputLabel>
                        <Select
                            value={interval}
                            onChange={handleIntervalChange}
                            label="Interval Type"
                            labelId='interval'
                            variant='outlined'
                            margin='normal'
                        >
                            <MenuItem value={'All'} key={'All'}>All</MenuItem>
                            {DEFAULT_INTERVALS.map((name, index) => (
                                <MenuItem key={index} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className='mt-3 mb-3'>
                        <InputLabel id="listenMode">Listen Mode</InputLabel>
                        <Select
                            value={ascDesc}
                            onChange={handleAscDescChange}
                            label="Listen Mode"
                            labelId='listenMode'
                            variant='outlined'
                            margin='normal'
                        >
                            <MenuItem value={'All'} key={'All'}>All</MenuItem>
                            {Object.entries(INTERVAL_LISTEN_MODES).map(([key, value]) => (
                                <MenuItem key={key} value={value}>
                                    {key}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <h3>{time}</h3>
                    <h6>Interval: {interval}</h6>
                    <h6>Listen Mode: {ascDesc}</h6>
                    <strong>
                        Correct: {correct}
                    </strong>
                    <br></br>
                    <strong>
                        Incorrect: {incorrect}
                    </strong>
                    <br></br>
                    <strong>
                        Total: {percentage}%
                    </strong>
                </>
                )
                }
                
            </div>
        </div>
        ) : (
        <div>Loading ... </div>
        )
        
    )
};

export default Dashboard