import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Layout from "./Layout2";
import Home from "./Home";
import IntervalsContainer from "./Games/Intervals/IntervalsContainer";
import ChordsContainer from './Games/Chords/ChordsContainer';
import SignUpForm from './Components/SignUpForm';
import LoginForm from './Components/LoginForm';
import AuthProvider from './Authorization/AuthProvider';
import ProfilePage from './Pages/ProfilePage';

const ApplicationViews = () => {
    return (
    //     <AuthProvider>
    //         <BrowserRouter>
    //             <Routes>
    //                 <Route path="/" element={<Layout />}>
    //                     <Route index element={<Home />} />
    //                     <Route path="register" element={<SignUpForm />} />
    //                     <Route path="login" element={<LoginForm />} />
    //                     <Route path="notes" element={<IntervalsContainer />} />
    //                     <Route path="chords" element={<ChordsContainer />} />
    //                     <Route path="profile" element={<ProfilePage />} />
    //                 </Route>
    //             </Routes>
    //         </BrowserRouter>
    //     </AuthProvider>
    // );
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="register" element={<Layout><SignUpForm /></Layout>} />
          <Route path="login" element={<Layout><LoginForm /></Layout>} />
          <Route path="notes" element={<Layout><IntervalsContainer /></Layout>} />
          <Route path="chords" element={<Layout><ChordsContainer /></Layout>} />
          <Route path="profile" element={<Layout><ProfilePage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    );
};

export default ApplicationViews;

