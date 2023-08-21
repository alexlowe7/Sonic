import React from "react";
import Modal from '@mui/material/Modal';
import { Row, Col } from "react-bootstrap";

const GameHeader = ({ title, description, open, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="help-title"
            aria-describedby="help-description"
        >   
            <div className="settings-popup">
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={8} className='text-center'>
                        <h2 className="text-center" id="help-title">{title}</h2>
                    </Col>
                    <Col xs={2}>
                        <button className="close-button" onClick={onClose}>
                            &times;
                        </button>
                    </Col>
                </Row>
                <Row className="heading game--description">
                    <Col>
                        <p className="lead text-center mb-0" id="help-description">{description}</p>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default GameHeader;
