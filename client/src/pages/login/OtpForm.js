import {React, useEffect, useState, useRef} from "react";
import "./login-form.css";
import {useNavigate} from "react-router-dom";
import {otpVerification} from "../../scripts/login-scripts.js";
import {useSnackbar} from "notistack"

function OtpForm({setLoading}) {

    const refs = {
        c1: useRef(null),
        c2: useRef(null),
        c3: useRef(null),
        c4: useRef(null),
        c5: useRef(null),
        c6: useRef(null),
    }
    const navigator = useNavigate();
    const [otp, setOtp] = useState({
        c1: '',
        c2: '',
        c3: '',
        c4: '',
        c5: '',
        c6: '',
    });
    const onOtpChange = (character, newValue)=>{
        const newOtp = {...otp};
        newOtp[character] = newValue;
        setOtp(newOtp);
    }
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const notification = {add: enqueueSnackbar, close: closeSnackbar};

    useEffect(()=>{
        if(!localStorage.getItem('temp_id'))
            navigator("/");
    }, [])

    return (
        <form className="otp-Form">
            <span className="mainHeading">Enter OTP</span>
            <p className="otpSubheading">We have sent a verification code to your email</p>
            <div className="inputContainer">
                <input ref={refs.c1}required="required" maxLength="1" type="text" className="otp-input" id="otp-input1" onChange={(event)=>{
                    onOtpChange('c1', event.target.value);
                    if(event.target.value){
                        refs.c2.current.focus();
                    }
                }}/>
                <input ref={refs.c2} required="required" maxLength="1" type="text" className="otp-input" id="otp-input2" onChange={(event)=>{
                    onOtpChange('c2', event.target.value);
                    if(event.target.value){
                        refs.c3.current.focus();
                    }
                }}/>
                <input ref={refs.c3} required="required" maxLength="1" type="text" className="otp-input" id="otp-input3" onChange={(event)=>{
                    onOtpChange('c3', event.target.value);
                    if(event.target.value){
                        refs.c4.current.focus();
                    }
                }}/>
                <input ref={refs.c4} required="required" maxLength="1" type="text" className="otp-input" id="otp-input4" onChange={(event)=>{
                    onOtpChange('c4', event.target.value);
                    if(event.target.value){
                        refs.c5.current.focus();
                    }
                }}/>
                <input ref={refs.c5} required="required" maxLength="1" type="text" className="otp-input" id="otp-input4" onChange={(event)=>{
                    onOtpChange('c5', event.target.value);
                    if(event.target.value){
                        refs.c6.current.focus();
                    }
                }}/>
                <input ref={refs.c6} required="required" maxLength="1" type="text" className="otp-input" id="otp-input4" onChange={(event)=>{
                    onOtpChange('c6', event.target.value);
                }}/>
            </div>
            <button className="verifyButton" type="submit" onClick={(event)=>{
                event.preventDefault();
                otpVerification(otp, notification, navigator, setLoading);
            }}>Verify</button>
            <p className="resendNote">Didn't receive the code? <button className="resendBtn">Resend Code</button></p>
        </form>
    )
}

export default OtpForm;