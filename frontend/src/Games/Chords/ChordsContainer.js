import React, { useState, useEffect } from "react";
import PlayButton from "../../Components/PlayButton";
import ScoreDisplaySection from "../../Components/ScoreDisplaySection";
import GameHeader from "../../Components/GameHeader";
import { getRandomInt, CHORDS } from "../../Helpers/Helpers";
import IntervalButton from "../../Components/AnswerButton";
import { Row } from "react-bootstrap";

const fileCount = 25;
const folderPath1 = 'Audio/Chords-Major-1stInversion';
const folderPath2 = 'Audio/Chords-Minor-1stInversion';
const fileExtension = '.mp3';

const filePaths1 = Array.from({ length: fileCount }, (_, i) =>
    `${process.env.PUBLIC_URL}/${folderPath1}/Major Triad - 1st Inversion - ${i}${fileExtension}`
);

const filePaths2 = Array.from({ length: fileCount }, (_, i) =>
    `${process.env.PUBLIC_URL}/${folderPath2}/Minor Triad-1st Inversion-${i}${fileExtension}`
);


const ChordsContainer = () => {
    // States
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [audio, setAudio] = useState([]);
    const [resetKey, setResetKey] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("")
    const [currentChord, setCurrentChord] = useState(0)

    // If no 'chord' is passed in, play 'currentChord' state 
    const playChord = (chord = currentChord) => {
        audio[chord].load()
        audio[chord].play()   
    };

    // Get the correct answer based on the chordIndex input
    // Will need to change when adding new chord types
    const getAnswer = (chordIndex) => {
        if (chordIndex < 25) {
            return "Major"
        } else if (chordIndex >= 25) {
            return "Minor"
        }
    };

    const resetButtonColors = () => {
        setTimeout(() => setResetKey(resetKey + 1), 1000);
    };

    const advanceToNextChord = () => {
        return new Promise((resolve) => {
            const newChord = getRandomInt(0, 49);
            const newAnswer = getAnswer(newChord);
        
            resetButtonColors();
            setHasAnswered(false);
            setCurrentChord(newChord);
            setCurrentAnswer(newAnswer);
            resolve({ 
                chord: newChord
            });
        });
    };

    const handleCorrectAnswer = async () => {
        if (!hasAnswered) {
            setCorrect(correct + 1);
        }
        const { chord } = await advanceToNextChord();
        setTimeout(() => playChord(chord), 1000);
    };

    const handleIncorrectAnswer = () => {
        if (!hasAnswered) {
            setIncorrect(incorrect + 1);
            setHasAnswered(true);
        }
    };

    useEffect(() => {

        // On mount 

        // Set current chord and current answer
        const newChord = getRandomInt(0, 49);
        const newAnswer = getAnswer(newChord);
        setCurrentChord(newChord);
        setCurrentAnswer(newAnswer);
        
        // Create temp array to put into 'audio' state
        const temp = [];

        // Push all audio files, from Major and Minor folders, into temp
        filePaths1.forEach((filePath) => {
            const audioFile = new Audio(filePath);
            temp.push(audioFile)
          });

        filePaths2.forEach((filePath) => {
            const audioFile = new Audio(filePath);
            temp.push(audioFile)
        });
        // Set audio state to temp array
        setAudio(temp)

        // Un-mount, clear audio state
        return () => {
            temp.forEach((audioFile) => {
                audioFile.pause();
                audioFile.src = '';
              });
              setAudio([]);
        }
    }, []);

    // useEffect(() => {
    //     // Update currentAnswer based on currentChord
    //     const newCurrentAnswer = getAnswer(currentChord)
    //     setCurrentAnswer(newCurrentAnswer);
    //   }, [currentChord]);

    return (
        <div className="game-chords--container">
            {/* <GameHeader
                title={"Chord Mode"}
                description={"Use your ear to indentify the chord type. Change your settings to change the chord options."}
            /> */}
            <ScoreDisplaySection 
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
                            correctAnswer={currentAnswer}
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