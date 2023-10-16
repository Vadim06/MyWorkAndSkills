import React, { useState, useEffect } from 'react';
import './Footer.css';
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
let icons = [<AiFillInstagram className='icon' size={'2.5rem'} color='rgb(199 63 80)' />,
<AiFillGithub className='icon' size={'2.5rem'} color='rgb(199 63 80)' />,
<AiFillLinkedin className='icon' size={'2.5rem'} color='rgb(199 63 80)' />];
let links = ['https://www.instagram.com/vadim.mikhaylets/', 'https://github.com/Vadim06', 'https://www.linkedin.com/feed/']

export const Footer = () => {

    return (
        <div className='findMe'>
            <h1>Find me on</h1>
            <div className='iconsContainer'>
                {icons.map((icon, index) => (
                    <a target='blank' key={index} href={links[index]} className='bubble'>
                        <div key={index}>{icon}</div>
                    </a>
                ))}
            </div>
        </div>
    )
}

