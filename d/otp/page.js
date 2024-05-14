"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import logo from '../../assets/simplyfy-logo.png';

export default function Otp(){
    const [otp, setOtp] = useState(Array.from({ length: 6 }, () => ''));
    const [displayedOtp, setDisplayedOtp] = useState(Array.from({ length: 6 }, () => ''));
    const inputRefs = useRef([]);
    const [resendDisabled, setResendDisabled] = useState(true);
    const [timer, setTimer] = useState(30);
    const [showIncorrectOTP, setShowIncorrectOTP] = useState(false);

    const correctOtp = "123456";

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setResendDisabled(false);
        }
    }, [timer]);

    useEffect(() => {
        if (timer === 0) {
            setResendDisabled(false);
        }
    }, [timer]);

    useEffect(() => {
        if (showIncorrectOTP) {
            setOtp(Array.from({ length: 6 }, () => ''));
            setDisplayedOtp(Array.from({ length: 6 }, () => ''));
            inputRefs.current[0].focus();
        }
    }, [showIncorrectOTP]);

    const handleChange = (index, value) => {
        if (/^\d*$/.test(value) || value === '') {
            const newDisplayedOtp = [...displayedOtp];
            newDisplayedOtp[index] = value ? '*' : '';
            setDisplayedOtp(newDisplayedOtp);

            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            } else if (value === '' && index > 0) {
                inputRefs.current[index - 1].focus();
            }

            if (index === 5 && value !== '') {
                const otpValue = newOtp.join('');
                if(!(otpValue == correctOtp)){
                    setShowIncorrectOTP(true);
                }
            }
        }
    };

    const assignRef = (element, index) => {
        if (element) {
            inputRefs.current[index] = element;
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        const textArray = text.split('').filter(char => !isNaN(parseInt(char, 10)));
        if (textArray.length > 0) {
            const newOtp = [...otp];
            for (let i = 0; i < newOtp.length; i++) {
                if (textArray.length === 0) break;
                if (newOtp[i] === '') {
                    newOtp[i] = textArray.shift();
                }
            }
            setOtp(newOtp);
            const newDisplayedOtp = newOtp.map(digit => digit ? '*' : '');
            setDisplayedOtp(newDisplayedOtp);
        }
    };

    const handleSubmit = () => {
        setTimer(30);
        setResendDisabled(true);
    };

    return (
        <div className="flex overflow-hidden fixed inset-0 items-center justify-center h-screen">
            <div className="bg-[#191A1F] border-[1px] border-[#828282] flex flex-col items-center justify-center rounded-lg px-6 py-2 mx-auto">
                <Image className="flex" src={logo} alt="Logo" width={120} height={120} />
                <div className="items-center w-full mb-5">
                    <h1 className="text-white text-center font-bold text-xl ">We have sent an OTP</h1>
                    <h2 className="text-white text-center text-[18px] mt-2">9536728236</h2>
                </div>

                <form id="otp-form" className="w-full mx-auto max-w-xs sm:max-w-sm">
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                ref={el => assignRef(el, index)}
                                type="text"
                                className="w-10 sm:w-12 h-10 sm:h-12 text-xl sm:text-2xl text-center font-bold text-white bg-transparent border border-white rounded focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                value={displayedOtp[index] || ''}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                maxLength={1}
                            />
                        ))}
                    </div>
                </form>
                {showIncorrectOTP && (
                    <div className="w-full flex justify-end mb-3 sm:mb-5 mt-2">
                        <p className="text-xs sm:text-sm text-[#FF3232] pt-1 justify-self-end">Incorrect OTP</p>
                    </div>
                )}
                <div className="w-full mt-4">
                    <button
                        type="button"
                        className={`w-full font-medium h-10 rounded-md mb-4 ${resendDisabled ? 'bg-[#EFD07C] text-[#6F6F6F] cursor-not-allowed' : 'bg-[#FBC741] text-black'}`}
                        onClick={handleSubmit}
                        disabled={resendDisabled}
                    >
                        {resendDisabled ? `Resend OTP (${timer}s)` : 'Resend OTP'}
                    </button>
                </div>
                <div className="w-full">
                    <a href="/d/login">
                        <button
                            className="w-full text-white border-[1px] border-[#828282] font-sm h-10 rounded-md mb-[20px]"
                        >
                            Edit Number
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

