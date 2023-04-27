import React, { useState, useEffect } from "react";
import {  DEFAULT_INTERVALS, getRandomInt, getInterval, generate2ndNote, getRandomBool } from "../../Helpers/Helpers";
import GameHeader from "../../Components/GameHeader";
import SettingsWindow from "../../Components/SettingsWindow";
import PlayButtonSection from "../../Components/PlayButtonSection";
import AnswerButtonSection from "../../Components/AnswerButtonSection";
import ScoreDisplaySection from "../../Components/ScoreDisplaySection";

const IntervalsContainer = () => {
    // States
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [audio, setAudio] = useState([]);
    const [resetKey, setResetKey] = useState(0);
    const [harmonicModeEnabled, setHarmonicModeEnabled] = useState(false);
    const [ascDescModeEnabled, setAscDescModeEnabled] = useState(true);
    const [ascDesc, setAscDesc] = useState('Ascending');
    const [ascDescBool, setAscDescBool] = useState(true)
    const [showHelpEnabled, setShowHelpEnabled] = useState(false);
    const [showSettingsEnabled, setShowSettingsEnabled] = useState(false);
    const [intervals, setIntervals] = useState(DEFAULT_INTERVALS);
    const [note1, setNote1] = useState(getRandomInt(0, 24));
    const [note2, setNote2] = useState(generate2ndNote(note1, intervals));
    const [interval, setInterval] = useState(getInterval(note1, note2));
    
    // ON MOUNT
    useEffect(() => {
  
        // Load all notes.mp3s into the temp array, then setState once complete
        const temp = [];
        for (let i = 0; i < 37; i++) {
            let file = new Audio(`${process.env.PUBLIC_URL}/Audio/Intervals-IndividualNotes/${i}.mp3`);
            temp.push(file);
        }
 
        setAudio(temp);

        // ON UN-MOUNT
        // Pause and empty Temp array, reset Audio State to empty
        return () => {
            temp.forEach((audioFile) => {
                audioFile.pause();
                audioFile.src = '';
              });
              setAudio([]);
        }

    }, []);

    // Update notes when 'intervals' state changes,
    // to avoid user not having the option to select the correct answer
    useEffect(() => {
        updateNotes();
        // eslint-disable-next-line
      }, [intervals]);

    // Handles all state changes necessary to move on to next question
    const updateNotes = () => {
        return new Promise((resolve) => {
            const newNote1 = getRandomInt(0, 24);
            const newNote2 = generate2ndNote(newNote1, intervals)
            const newInterval = getInterval(newNote1, newNote2);
            const bool = getRandomBool()
        
            setNote1(newNote1);
            setNote2(newNote2);
            setInterval(newInterval);
            setAscDescBool(bool);
            resolve({ 
                note1: newNote1, 
                note2: newNote2,  
                bool: bool 
            });
        });
      };

    // after 1 second, change reset key which re-renders all buttons 
    const resetButtonColors = () => {
        setTimeout(() => setResetKey(resetKey + 1), 1000);
      };
    
    // 'play' functions handle playing the audio 
    // Use 'audio' state with an index of 'note' to play the correct file

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
    
    // Play notes in different orders based on the current state
    const handlePlayButtonClick = () => {
        if (ascDescModeEnabled) {
            if (ascDescBool) {
                playInterval(note1, note2);
            } else {
                playInterval(note2, note1);
            }
        }
        else {
            if (ascDesc === "Ascending") {
                playInterval(note1, note2);
            }
            else {
                playInterval(note2, note1);
            }
        }
    };
    
    const handleCorrectAnswer = async () => {
        // Wait 100ms to reset Button Colors to give time for user 
        // to see that they clicked the correct answer
        setTimeout(() => {
            resetButtonColors()
        }, 100)
        // Only count 'correct' if it was their first attempt for this interval
        if (!hasAnswered) {
            setCorrect(correct + 1);
          }
        // Reset 'has answered' state
        setHasAnswered(false);
        // Await update notes to get proper notes to pass into playInterval function
        // Was not working by simply using the state values as the playInterval function's input
        const { note1, note2, bool } = await updateNotes();
        setTimeout(() => {
            if (ascDescModeEnabled) {
                if (bool) {
                    playInterval(note1, note2);
                } else {
                    playInterval(note2, note1);
                }
            }
            else {
                if (ascDesc === "Ascending") {
                    playInterval(note1, note2);
                }
                else {
                    playInterval(note2, note1);
                }
            }
        }, 1000);
    };

    const handleIncorrectAnswer = () => {
        if (!hasAnswered) {
            setIncorrect(incorrect + 1);
            setHasAnswered(true);
        }
    };

    // MODE CHANGES

    const handleAscDescModeChange = (event) => {
        setAscDescModeEnabled(event.target.checked);
    }

    const handleAscDescSwitchChange = (newValue) => {
        setAscDesc(newValue);
    }

    const handleHarmonicModeChange = (event) => {
        setHarmonicModeEnabled(event.target.checked);
    };

    const handleToggleInterval = (event, label) => {
        setIntervals(prevIntervals => {

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
    // TODO: Abstract into helper module

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
        if (showHelpEnabled) {
            setShowHelpEnabled(false);
        } else {
            setShowHelpEnabled(true);
        }
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
                ascDesc={ascDesc}
                DEFAULT_INTERVALS={DEFAULT_INTERVALS}
                intervals={intervals}
                handleToggleInterval={handleToggleInterval}
            />
            <ScoreDisplaySection 
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
                intervals={intervals}
                interval={interval}
                handleCorrectAnswer={handleCorrectAnswer}
                handleIncorrectAnswer={handleIncorrectAnswer}
                resetKey={resetKey}
            />
        </div>
    );
};

export default IntervalsContainer;
