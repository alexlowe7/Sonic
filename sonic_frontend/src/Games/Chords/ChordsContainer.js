import React, { useState, useEffect, useRef } from "react";
import PlayButton from "../../Components/PlayButton";
import ScoreDisplaySection from "../../Components/ScoreDisplaySection";
import { getRandomInt, CHORDS, CHORDS_CONFIG, updateChordStatsObject, 
        generateDefaultChordStats, generateChordSelection } from "../../Helpers/Helpers";
import IntervalButton from "../../Components/AnswerButton";
import { Row } from "react-bootstrap";
import api from "../../API/Api";

const ChordsContainer = () => {
    
    const FILE_EXTENSION = '.mp3';
    const BASE_PATH = 'Audio/Chords';
    const FILE_COUNT = 25;
    const selectedChordsArray = generateChordSelection()
    
    const generateFilePathForChord = (chordName, chordIndex) => {
        const chordTypeNumber = CHORDS_CONFIG[chordName];
        return `${process.env.PUBLIC_URL}/${BASE_PATH}/${chordName}/` +
                `${chordTypeNumber}-${chordIndex}${FILE_EXTENSION}`;
    };
    
    const pickRandomChord = (options) => {
        const chords = Object.keys(options).filter(chord => options[chord]);
        const chordType = chords[Math.floor(Math.random() * chords.length)];
        const chordIndex = Math.floor(Math.random() * FILE_COUNT);
        const path = generateFilePathForChord(chordType, chordIndex);

        return {
            type: chordType,
            index: chordIndex,
            path: path,
        };
    };
    

    // States

    // Array of chords that the user wants to play with
    const [selectedChords, setSelectedChords] = useState(selectedChordsArray)
    // The current chord being played 
    const [currentChord, setCurrentChord] = useState(pickRandomChord(selectedChordsArray))
    // Array of audio files
    const [audio, setAudio] = useState(null);
    // Stats 
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [score, setScore] = useState(0);
    const [stats, setStats] = useState(generateDefaultChordStats());
    const [sessionID, setSessionID] = useState(null);
    // If the current chord has been answered
    const [hasAnswered, setHasAnswered] = useState(false);
    
    // Used to control button resetting after each new chord
    const [resetKey, setResetKey] = useState(0);

    // Refs (used for stat updating before dismount)
    const statsRef = useRef(stats);
    const idRef = useRef(sessionID);
    const correctRef = useRef(correct)
    const incorrectRef = useRef(incorrect)

    useEffect(() => {
        statsRef.current = stats;
      }, [stats]);

    useEffect(() => {
        idRef.current = sessionID;
    }, [sessionID]);

    useEffect(() => {
        correctRef.current = correct
    }, [correct])

    useEffect(() => {
        incorrectRef.current = incorrect
    }, [incorrect])

    useEffect(() => {
        console.log("useeffect ran")
        if (audio) {
            audio.src = currentChord.path;
        } else {
            const chordAudioFile = new Audio(currentChord.path);
            setAudio(chordAudioFile);
        }
    }, [currentChord])

    // Functions

    const playChord = () => {
        if (!audio) {
            pickRandomChord(selectedChords)
        }
        audio.load()
        audio.play() 
    };

    const resetButtonColors = () => {
        setTimeout(() => setResetKey(resetKey + 1), 1000);
    };

    const advanceToNextChord = () => {
        console.log("advanceToNextChord")
        const newChord = pickRandomChord(selectedChords);
        resetButtonColors();
        setHasAnswered(false);
        setCurrentChord(newChord);
        return newChord;
    };
    
    const handleCorrectAnswer = () => {
        console.log("correct")       
        if (!hasAnswered) {
            updateStats("correct", currentChord.type);
            setCorrect(correct + 1);
            setScore(score => score + 10);
        }
        advanceToNextChord();
        setTimeout(playChord, 1000);
    };

    const handleIncorrectAnswer = () => {
        console.log("incorrect")      
        if (hasAnswered)
            return;

        updateStats("incorrect", currentChord.type);
        setIncorrect(incorrect + 1);
        setHasAnswered(true);
    };

    useEffect(() => {

        // On mount 
        async function getSessiondID() {
            const response = await api.createChordSession();
            const id = response.id

            if (id !== null) {
                console.log("session id: ", id)
                setSessionID(id)
            } else {
                console.log('session id is null')
            }
            return;
        }

        async function handleSessionStats() {
            if (idRef.current === null) {
                console.log('session id is null. running get session ID again')
                await getSessiondID();
                return; 
            }
            if (correctRef === 0 && incorrectRef === 0)
                return;

            const updateStatus = await api.updateChordSession(
                idRef.current, 
                correctRef.current, 
                incorrectRef.current, 
                statsRef.current
            );

            if (updateStatus == null) {
                setSessionID(null)
            }
        }

        handleSessionStats();
        const intervalId = setInterval(handleSessionStats, 30000);

        // Un-mount, clear audio state
        return () => {
            setAudio(null);
            handleSessionStats();
            clearInterval(intervalId);
        }
    }, []);

    const updateStats = (
        correctOrIncorrect,
        chordToUpdate,
    ) => {
      
        const updatedStats = updateChordStatsObject(
            stats, 
            chordToUpdate, 
            correctOrIncorrect,
        );
        setStats(updatedStats);
        return;
    };

    return (
        <div className="game-chords--container">
            {/* <GameHeader
                title={"Chord Mode"}
                description={"Use your ear to indentify the chord type. Change your settings to change the chord options."}
            /> */}
            <ScoreDisplaySection 
                score={score}
                correct={correct} 
                incorrect={incorrect} 
            />
            <Row>
                <PlayButton 
                    handlePlayButtonClick={playChord}
                    className={"centered-item"}
                />
            </Row>
            <Row>
                <div className="col-12 col-lg-6 mx-auto button-container text-center">
                    {CHORDS.map((answerName) => (
                        <IntervalButton
                            key={`${answerName}-${resetKey}`}
                            answerName={answerName}
                            correctAnswer={currentChord.type}
                            onCorrect={handleCorrectAnswer}
                            onIncorrect={handleIncorrectAnswer}
                        />
                    ))}
                </div>
            </Row>
        </div>
    )
}

export default ChordsContainer;