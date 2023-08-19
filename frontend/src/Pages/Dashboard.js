import React, { useState, useEffect } from 'react';
import useAuth from '../Authorization/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../API/Api';
import { MenuItem, TextField } from '@mui/material';
import { generateDefaultChordStats, DEFAULT_INTERVALS_STAT,
        combineAllChordStats, combineAllIntervalStats } from '../Helpers/Helpers';
import IntervalStatsTable from '../Components/IntervalStatsTable';
import ChordStatsTable from '../Components/ChordStatsTable';

const Dashboard = () => {

    const { user } = useAuth();

    const [userStats, setUserStats] = useState(null);
    const [gameMode, setGameMode] = useState('interval');
    const [intervalStats, setIntervalStats] = useState(null);
    const [chordStats, setChordStats] = useState(null);

    useEffect(() => {
        async function getUserStats() {
            const stats = await api.getUserStats();
            setUserStats(stats);
        };

        getUserStats();
    }, [])

    useEffect(() => {
        if (userStats === null)
            return;

        const blankIntervalStat = JSON.parse(JSON.stringify(DEFAULT_INTERVALS_STAT));
        const blankChordStat = JSON.parse(JSON.stringify(generateDefaultChordStats()));
        const allIntervalStats = combineAllIntervalStats(blankIntervalStat, userStats['interval_stats']);
        const allChordStats = combineAllChordStats(blankChordStat, userStats['chord_stats']);

        setIntervalStats(allIntervalStats);
        setChordStats(allChordStats);

    }, [userStats]);

    const handleGameModeChange = (event) => {
        setGameMode(event.target.value);
    }

    return(
        user !== null ? 
        (
            <>
                <div className='profile-container mt-3 px-2'>
                    <h2 className='text-center'>{user.username}'s Stats</h2>
                    <TextField 
                        defaultValue='interval'
                        select 
                        fullWidth 
                        label='Game Mode'
                        onChange={event => handleGameModeChange(event)}
                    >
                        <MenuItem value='interval'>Intervals</MenuItem>
                        <MenuItem value='chord'>Chords</MenuItem>
                    </TextField>
                </div>
                {intervalStats !== null && gameMode === 'interval' &&
                    <IntervalStatsTable stats={intervalStats} />
                }
                {chordStats !== null && gameMode === 'chord' &&
                    <ChordStatsTable stats={chordStats} />
                }
            </>
        ) : (
            <div>Loading ... </div>
        )
        
    )
};

export default Dashboard;