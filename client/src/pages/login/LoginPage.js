import React, { useState } from 'react';
import './styles.css'; // Import CSS file
import LoginForm from './LoginForm';
import logo from "../../assets/images/Epoka_wATER_fILTERTS-removebg-preview.png"
import filterImage from "../../assets/images/filter_image_purple.png"
import { Routes, Route } from "react-router-dom";
import OtpForm from './OtpForm';
import Loading from '../../components/Loading/loading';

function LoginPage() {

    const [loading, setLoading] = useState(false);

    return (
        <div className="area">
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div className="inner-desktop">
                <img src={logo} alt="Epoka Water Filter" className="logo" />
                <p className="slogan">
                    Pure Water, Pure Life
                    <br />
                    Filtered for Your Wellness
                </p>
                <div className="right-panel">
                    <div className='welcomeHeader'>Welcome to Epoka Water Filters</div>
                    <img src={filterImage} alt="Epoka Water Filter" className="logo2" />
                    {
                        loading ? <Loading /> :
                            <Routes>
                                <Route path="/" element={<LoginForm setLoading={setLoading}/>} />
                                <Route path="/otp-verification" element={<OtpForm setLoading={setLoading}/>} />
                            </Routes>
                    }
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
