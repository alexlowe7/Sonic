import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {  DEFAULT_INTERVALS, DEFAULT_INTERVALS_STAT, 
            getRandomInt, getInterval, generate2ndNote, 
            getRandomBool, updateStatsObject } from "../../Helpers/Helpers";
import GameHeader from "../../Components/GameHeader";
import SettingsWindow from "../../Components/SettingsWindow";
import PlayButtonSection from "../../Components/PlayButtonSection";
import AnswerButtonSection from "../../Components/AnswerButtonSection";
import ScoreDisplaySection from "../../Components/ScoreDisplaySection";
import useAuth from "../../Authorization/useAuth";
import api from "../../API/Api";
import StatsTable from "../../Components/StatsTable";

const IntervalsContainer = () => {
    // States
    const [gamePlayed, setGamePlayed] = useState(false)
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [score, setScore] = useState(0);
    const [statBreakdown, setStatBreakdown] = useState(DEFAULT_INTERVALS_STAT);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [audio, setAudio] = useState([]);
    const [resetKey, setResetKey] = useState(0);
    const [harmonicModeEnabled, setHarmonicModeEnabled] = useState(false);
    const [ascDescModeEnabled, setAscDescModeEnabled] = useState(true);
    const [ascDescSwitch, setAscDescSwitch] = useState('Ascending');
    const [ascDescBool, setAscDescBool] = useState(true);
    const [activeIntervals, setActiveIntervals] = useState(DEFAULT_INTERVALS);
    const [note1, setNote1] = useState(getRandomInt(0, 24));
    const [note2, setNote2] = useState(generate2ndNote(note1, activeIntervals));
    const [currentInterval, setCurrentInterval] = useState(getInterval(note1, note2));
    const [showHelpEnabled, setShowHelpEnabled] = useState(false);
    const [showSettingsEnabled, setShowSettingsEnabled] = useState(false);

    const { login, accessToken, refreshToken, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const statsRef = useRef(statBreakdown);
    
    // ON MOUNT
    useEffect(() => {
  
        // Load all notes.mp3s into the temp array, then setState once complete
        const temp = [];
        for (let i = 0; i < 37; i++) {
            let file = new Audio(`${process.env.PUBLIC_URL}/Audio/Intervals-IndividualNotes/${i}.mp3`);
            temp.push(file);
        }
        console.log('Component mounted')
        setAudio(temp);

        // Perform the cleanup when the route changes
        // temp.forEach((audioFile) => {
        //     audioFile.pause();
        //     audioFile.src = '';
        //   });
        return () => {
            // Cleanup function
            setAudio([]);
            console.log('Component unmounted');
            // if (!gamePlayed) return;
            api.postIntervalSessionData(statsRef.current);
        };

    }, []);

    useEffect(() => {
        statsRef.current = statBreakdown;
      }, [statBreakdown]);

    useEffect(() => {
        updateNotes();
        // eslint-disable-next-line
    }, [activeIntervals]);

    // Handles all state changes necessary to move on to next question
    const updateNotes = () => {
        return new Promise((resolve) => {
            const newNote1 = getRandomInt(0, 24);
            const newNote2 = generate2ndNote(newNote1, activeIntervals)
            const newInterval = getInterval(newNote1, newNote2);
            const bool = getRandomBool()
        
            setNote1(newNote1);
            setNote2(newNote2);
            setCurrentInterval(newInterval);
            setAscDescBool(bool);
            resolve({ 
                note1: newNote1, 
                note2: newNote2,  
                bool: bool 
            });
        });
      };

    const resetButtonColors = () => {
        setTimeout(() => setResetKey(resetKey + 1), 1000);
      };
    
    // 'playNote' functions handle playing the audio 
    // Uses 'audio' state with an index of 'note' to play the correct file
    const playNote1 = (note) => {
        audio[note].play();
    }

    const playNote2 = (noteToPlay, noteToPause, shouldPause) => {
        if (shouldPause) {
            audio[noteToPause].pause();
        }
        audio[noteToPlay].play();
    }
    
    // Plays 2 notes. If harmonic mode is enabled, it reduces time in between notes to 10ms
    const playInterval = (note1, note2) => {
        let time = 1000
        if (harmonicModeEnabled) {
            time = 10
        }
        audio[note1].load();
        audio[note2].load();
        playNote1(note1);
        setTimeout(() => {
            playNote2(note2, note1, !harmonicModeEnabled)
        }, time);
    };
    
    // Play notes in different orders based on the current state or optional arguments
    const handlePlayButtonClick = (a = note1, b = note2, bool = ascDescBool) => {
        if (isCurrentIntervalAsc(bool))
            playInterval(a, b);
        else
            playInterval(b, a);
    };
    
    const handleCorrectAnswer = async () => {
        checkGamePlayed();
        if (!hasAnswered) {
            updateStats("correct", currentInterval, isCurrentIntervalAsc(), harmonicModeEnabled);
            setCorrect(correct + 1);
            setScore(score + 10);
        }

        resetButtonColors();
        setHasAnswered(false);

        const { note1, note2, bool } = await updateNotes();

        setTimeout(() => {
            handlePlayButtonClick(note1, note2, bool)
        }, 1000);
    };

    const handleIncorrectAnswer = () => {
        checkGamePlayed();
        if (hasAnswered) {
            setScore(Math.max(score - 1, 0))
            return
        }
        updateStats("incorrect", currentInterval, isCurrentIntervalAsc(), harmonicModeEnabled);
        setIncorrect(incorrect + 1);
        setScore(Math.max(score - 5, 0))
        setHasAnswered(true);
    };

    // HELPERS
    const updateStats = (
        correctOrIncorrect,
        intervalToUpdate,
        isAscending,
        isHarmonic
    ) => {
        const ascDescOrHarmonic = isHarmonic
            ? 'harmonic'
            : isAscending
            ? 'ascending'
            : 'descending';
      
        const updatedStats = updateStatsObject(
            statBreakdown, 
            intervalToUpdate, 
            ascDescOrHarmonic, 
            correctOrIncorrect,
        );
        console.table(updatedStats)
        setStatBreakdown(updatedStats);
        return;
    };

    const isCurrentIntervalAsc = (bool = ascDescBool) => {
        return (
            (ascDescModeEnabled && bool) || 
            (!ascDescModeEnabled && ascDescSwitch === "Ascending")
        );   
      };

    const checkGamePlayed = () => {
        if (!gamePlayed)
            setGamePlayed(true)
    };

    // MODE CHANGES

    const handleAscDescModeChange = (event) => {
        setAscDescModeEnabled(event.target.checked);
    }

    const handleAscDescSwitchChange = (newValue) => {
        setAscDescSwitch(newValue);
    }

    const handleHarmonicModeChange = (event) => {
        setHarmonicModeEnabled(event.target.checked);
    };

    const handleToggleInterval = (event, label) => {
        setActiveIntervals(prevIntervals => {

            const isChecked = event.target.checked
            const intervalIsAlreadyActive = prevIntervals.includes(label)

            if (isChecked) {
                if (!intervalIsAlreadyActive) {
                    return [...prevIntervals, label];
                }
                return prevIntervals;
            } else {
                return prevIntervals.filter(item => item !== label);
            }
        });
    };

    // MODAL TOGGLE (SETTINGS/HELP)

    const closeSettings = () => {
        setShowSettingsEnabled(false);
    };
    
    const handleClickSettingsButton = () => {
        if (showSettingsEnabled) {
            setShowSettingsEnabled(false);
        } else {
            setShowSettingsEnabled(true);
        }
    }

    const closeHelp = () => {
        setShowHelpEnabled(false);
    }

    const handleClickHelpButton = () => {
        if (showHelpEnabled)
            setShowHelpEnabled(false);
        else
            setShowHelpEnabled(true);
    }

    return (
        <div className="game-interval--container">
            <GameHeader 
                title={"Note Mode"}
                description={"Use your ear to identify the interval. Change your settings to change the interval options."}
                open={showHelpEnabled}
                onClose={closeHelp}
            />
            <SettingsWindow 
                open={showSettingsEnabled} 
                onClose={closeSettings}
                handleHarmonicModeChange={handleHarmonicModeChange}
                handleAscDescModeChange={handleAscDescModeChange}
                handleAscDescSwitchChange={handleAscDescSwitchChange}
                isHarmonicModeEnabled={harmonicModeEnabled}
                ascDescModeEnabled={ascDescModeEnabled}
                ascDescSwitch={ascDescSwitch}
                DEFAULT_INTERVALS={DEFAULT_INTERVALS}
                activeIntervals={activeIntervals}
                handleToggleInterval={handleToggleInterval}
            />
            {/* <p className="test-font">This is a test. 100%. 598pts. </p> */}
            {/* <StatsTable stats={statBreakdown}/> */}
            <ScoreDisplaySection 
                score={score}
                correct={correct} 
                incorrect={incorrect} 
            />
            <PlayButtonSection
                handlePlayButtonClick={handlePlayButtonClick} 
                handleClickSettingsButton={handleClickSettingsButton}
                handleClickHelpButton={handleClickHelpButton}
            />
            <AnswerButtonSection 
                DEFAULT_INTERVALS={DEFAULT_INTERVALS}
                activeIntervals={activeIntervals}
                currentInterval={currentInterval}
                handleCorrectAnswer={handleCorrectAnswer}
                handleIncorrectAnswer={handleIncorrectAnswer}
                resetKey={resetKey}
            />
        </div>
    );
};

export default IntervalsContainer;
