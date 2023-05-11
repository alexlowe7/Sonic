import React from "react";
import AnswerButton from "./AnswerButton";
import { Row, Col } from "react-bootstrap";

const AnswerButtonSection = ({ 
    DEFAULT_INTERVALS,
    activeIntervals,
    currentInterval,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    resetKey,
}) => {
    return (
        <Row>
            <Col xs={12} md={8} className="mt-2 mx-auto button-container text-center">
                {DEFAULT_INTERVALS.map((intervalName) =>
                    activeIntervals.includes(intervalName) && (
                        <AnswerButton
                            key={`${intervalName}-${resetKey}`}
                            answerName={intervalName}
                            correctAnswer={currentInterval}
                            onCorrect={handleCorrectAnswer}
                            onIncorrect={handleIncorrectAnswer}
                        />
                    )
                )}
            </Col>
        </Row>
    )
}

export default AnswerButtonSection