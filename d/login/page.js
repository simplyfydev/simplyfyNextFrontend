"use client"
import React, { useState } from "react";
import Image from 'next/image';
import img2 from '../../assets/icons8-qr-24.png';
import emailIcon from '../../assets/env1.png';
import phoneIcon from '../../assets/resize.png';
import { MdMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const buttonStyle = {};
const selectedButtonStyle = {};

export default function Login(){
    const [selectedBtn, setSelectedBtn] = useState("signup");
    const [emailInput, setEmailInput] = useState("");
    const [phoneNumberInput, setPhoneNumberInput] = useState("");

    const handleButtonClick = (btnType) => {
        setSelectedBtn(btnType);
    };

    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumberInput(e.target.value);
    };

    const inputStyle = {
        backgroundImage: `url(${selectedBtn === 'login' ? emailIcon.src : phoneIcon.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '10px center',
        paddingLeft: '40px',
    };

    return (
        <>
            <div className="flex overflow-hidden fixed inset-0 items-center justify-center h-screen ">
            <div className="bg-[#191A1F] border-[1px] border-[#828282] flex flex-col items-center justify-center rounded-lg px-6 py-2 mx-auto ">
                    <Image src={require('../../assets/simplyfy-logo.png')} alt="Logo" width={120} height={120} />
                    <div className="flex justify-between items-center w-full mb-5">
                        <h1 className="text-white font-poppins font-bold text-xl mb-2">Log in</h1>
                        <button className="text-white">
                            <Image src={img2} alt="QR Icon" width={24} height={24} />
                        </button>
                    </div>

                    <div className="w-full">
                        <div className="w-full mb-5">
                            <div className="justify-center max-w-md bg-[#222329] rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex h-11 bg-[#222329] justify-center sm:w-full p-[4px]">
                                    <button
                                        className={`focus:outline-none rounded flex items-center justify-center ${selectedBtn === "login"
                                            ? "bg-[#FBC741] text-black"
                                            : "bg-[#222329] text-white"
                                            } font-medium text-sm w-6/12 px-4`}
                                        onClick={() => handleButtonClick("login")}
                                        style={selectedBtn === "login" ? selectedButtonStyle : buttonStyle}
                                    >
                                        <MdMail className="mr-2 w-5 h-5" />Email
                                    </button>
                                    <button
                                        className={`focus:outline-none rounded ${selectedBtn === "signup"
                                            ? "bg-[#FBC741] text-black"
                                            : "bg-[#222329] text-white"
                                            } font-medium text-sm w-6/12 px-4 py-0 flex items-center justify-center`} // Added flex, items-center, justify-center
                                        onClick={() => handleButtonClick("signup")}
                                        style={selectedBtn === "signup" ? selectedButtonStyle : buttonStyle}
                                    >
                                        <FaPhoneAlt className="w-4 h-4 mr-2 mb-1" /> {/* Added h-5 for uniform size, mr-2 for margin right */}
                                        Number
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedBtn === "login" && (
                        <div className="relative w-full">
                            <input
                                type="email"
                                value={emailInput}
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                                style={inputStyle}
                                className="w-full px-3 py-2 rounded-lg border-[1px] border-[#828282] bg-[#191A1F] text-white focus:outline-none focus:border-[#828282]"
                            />
                            {emailInput && (
                                <button
                                    className="absolute top-0 right-0 h-full px-3 bg-transparent text-gray-300 focus:outline-none"
                                    onClick={() => setEmailInput("")}
                                >
                                    X
                                </button>
                            )}
                        </div>
                    )}
                    {selectedBtn === "signup" && (
                        <div className="relative w-full">
                            <input
                                type="tel"
                                value={phoneNumberInput}
                                onChange={handlePhoneNumberChange}
                                placeholder="+91 Phone Number"
                                style={inputStyle}
                                className="w-full px-3 py-2 rounded-lg border-[1px] border-[#828282] bg-[#191A1F] text-white focus:outline-none focus:border-[#828282]"
                            />

                            {phoneNumberInput && (
                                <button
                                    className="absolute top-0 right-0 h-full px-3 bg-transparent text-gray-300 focus:outline-none"
                                    onClick={() => setPhoneNumberInput("")}
                                >
                                    X
                                </button>
                            )}
                        </div>
                    )}

                    <div className="w-full">
                        <button className="w-full bg-[#FBC741] font-bold h-8 rounded-md mb-2 mt-5">Proceed</button>
                    </div>
                    <div className="w-full flex justify-end mb-5">
                        <a className="text-[12px] text-white px-1 pt-1" href="#">Skip &#x003E;</a>
                    </div>

                </div>
            </div>
        </>
    );
}

