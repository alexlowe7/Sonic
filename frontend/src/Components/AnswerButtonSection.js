import React from "react";
import AnswerButton from "./AnswerButton";
import { Row, Col, Stack } from "react-bootstrap";

const AnswerButtonSection = ({ 
    DEFAULT_INTERVALS,
    intervals,
    interval,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    resetKey,
}) => {
    return (
        <Row>
            <Col xs={12} md={8} className="mt-2 mx-auto button-container text-center">
                {DEFAULT_INTERVALS.map((intervalName) =>
                    intervals.includes(intervalName) && (
                        <AnswerButton
                            key={`${intervalName}-${resetKey}`}
                            answerName={intervalName}
                            correctAnswer={interval}
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