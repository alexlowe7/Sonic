import React from 'react';
import Modal from '@mui/material/Modal';
import ModeCheckbox from './ModeCheckbox';
import OptionSwitch from './OptionSwitch';
import { Row, Col } from 'react-bootstrap';

const SettingsWindow = ({ onClose, open, intervals, DEFAULT_INTERVALS, ...props }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="settings-modal-title"
            aria-describedby="settings-modal-description"
        >
            <div className="settings-popup">
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={8} className='text-center'>
                        <h2 id="settings-modal-title">Settings</h2>
                    </Col>
                    <Col xs={2}>
                        <button className="close-button" onClick={onClose}>
                            &times;
                        </button>
                    </Col>
                </Row>
                <Row>
                    <ModeCheckbox
                        onChange={props.handleHarmonicModeChange}
                        isEnabled={props.isHarmonicModeEnabled}
                        label={"Harmonic Mode"}
                    />
                    <ModeCheckbox
                        onChange={props.handleAscDescModeChange}
                        isEnabled={props.ascDescModeEnabled}
                        label={"Ascending/Descending Mode"}
                    />
                    {!props.ascDescModeEnabled &&
                    <OptionSwitch
                        onChange={props.handleAscDescSwitchChange}
                        option1="Ascending"
                        option2="Descending"
                        selected={props.ascDesc}
                    />
                    }
                </Row>
                <hr/>
                <div className='grid-container'>
                    {DEFAULT_INTERVALS.map((intervalName) => {
                        return (
                            <ModeCheckbox
                                onChange={props.handleToggleInterval}
                                isEnabled={intervals.includes(intervalName)}
                                label={intervalName}
                                key={intervalName}
                            />
                        );
                    })}
                </div>
            </div>
        </Modal>
    );
};

export default SettingsWindow;
