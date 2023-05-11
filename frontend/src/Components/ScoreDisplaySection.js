import React from "react";
import { Row, Col } from "react-bootstrap";

const ScoreDisplaySection = ({ correct, incorrect, score }) => {
    const totalAnswered = correct + incorrect
    const decimal = (correct / (totalAnswered)) * 100
    const percentage = decimal.toFixed(0)

    return (
        <Row className="my-2 pb-2 pt-1 score-section">
            {totalAnswered === 0 ?
            (
                <Col xs={12}>
                    <p className="text-center my-auto">
                        Start playing to see your stats!
                    </p>
                </Col>
            ) : (
            <>
                <Col xs={4}>
                    <p className="text-center my-auto">
                        {score}pts
                    </p>
                </Col>
                <Col xs={4}>
                    <p className="text-center my-auto">
                        {correct}/{correct + incorrect}
                    </p>
                </Col>
                <Col xs={4}>
                    <p className="text-center my-auto">
                        {totalAnswered === 0 ? "0%" : `${percentage}%`}
                    </p>
                </Col>
            </>
            )
            }
        </Row>
    )
};

export default ScoreDisplaySection;
