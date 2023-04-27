import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout2";
import Home from "./Home";
import IntervalsContainer from "./Games/Intervals/IntervalsContainer";
import ChordsContainer from './Games/Chords/ChordsContainer';

const ApplicationViews = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="notes" element={<IntervalsContainer />} />
                    <Route path="chords" element={<ChordsContainer />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default ApplicationViews;

