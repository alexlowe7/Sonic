import React from "react";
import PlayButton from "./PlayButton";
import SettingsIconButton from "./SettingsIconButton";
import HelpIconButton from "./HelpIconButton";
import { Row, Col } from "react-bootstrap";

const PlayButtonSection = ({ 
    handlePlayButtonClick, 
    handleClickSettingsButton, 
    handleClickHelpButton 
}) => {
    return (
        <Row className="mt-3 mb-3">
            <Col xs={4}></Col>
            <Col xs={4} className="d-flex">
                <PlayButton 
                    handlePlayButtonClick={handlePlayButtonClick} 
                    className={"centered-item"}
                />
            </Col>
            <Col xs={4} className="d-flex">
                <div className="right-item">
                    <SettingsIconButton 
                        size={25}
                        onClick={handleClickSettingsButton}
                    />
                    <HelpIconButton
                        size={25}
                        onClick={handleClickHelpButton}
                    />
                </div>   
            </Col>
        </Row>
    )
}

export default PlayButtonSection