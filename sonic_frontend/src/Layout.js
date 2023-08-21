import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
// import './styles.css';
import './index.css';

const Layout = () => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg d-flex">
                <div className=''>
                    <Link className="navbar-brand" to="/">Ear Training</Link>
                </div>
                <div className='col d-flex justify-content-end'>
                    <div className="navbar-nav ml-auto text-end">
                        <Link className="nav-link text-end ml-auto" to="/intervals"><strong>Interval Training</strong></Link>
                        <Link className="nav-link text-end ml-auto" to="/chords"><strong>Chord Training</strong></Link>
                    </div>
                </div>
                

            </nav>
            <div className="body">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Layout;
