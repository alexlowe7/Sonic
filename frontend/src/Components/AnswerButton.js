import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";

const AnswerButton = ({
  answerName,
  correctAnswer,
  onCorrect,
  onIncorrect,
}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const buttonRef = useRef();

    const handleClick = () => {
        if (answerName === correctAnswer) {
            buttonRef.current.classList.add("correct");
            onCorrect();
        } else {
            setIsDisabled(true);
            onIncorrect();
        }
    };

    return (
        <Button
            variant="contained"
            className="interval-button"
            onClick={handleClick}
            disabled={isDisabled}
            ref={buttonRef}
            // disableElevation
        >
            {answerName}
        </Button>
    );
};

export default AnswerButton;
