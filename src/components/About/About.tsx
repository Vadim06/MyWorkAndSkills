import React, { useState, useEffect } from 'react';
import './About.css';
import me from '../../img/me.jpg'
import { AiOutlineHtml5 } from "react-icons/ai";
import { ImCss3 } from "react-icons/im";
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";
import { BiLogoReact, BiGitBranch } from "react-icons/bi";
import { RiBootstrapLine } from "react-icons/ri";
let icons = [
    <AiOutlineHtml5 size={'5rem'} />,
    <ImCss3 size={'4rem'} />,
    <TbBrandJavascript size={'5rem'} />,
    <BiLogoReact size={'5rem'} />,
    <TbBrandTypescript size={'5rem'} />,
    <BiGitBranch size={'5rem'} />,
    <RiBootstrapLine size={'5rem'} />
]

export const About = () => {

    return (
        <section className="aboutSection">
            <div className='aboutText'>
                <div>
                    <h2>Some info about <span>me</span></h2>
                    <p>
                        Hi, I am <span>Vadym Mykhailets</span>, current location: <span>Czech Republic</span>
                        <br />
                        I am studying at Hejčín highschool in Olomouc
                        <br />
                        I enjoy learning new technologies, problem-solving and working in a team
                    </p>
                    <h6>Some of my <span>hobbies</span></h6>
                    <ul className='hobbies'>
                        <li>Working out</li>
                        <li>Photography</li>
                        <li>Video editing</li>
                        <li>Cycling</li>
                    </ul>
                </div>
                <img src={me} alt="me" className='me' />
            </div>
            <div className='skillset'>
                <h1>Professional <span>skillset</span></h1>
                <div className='skillsetBtns'>
                    {icons.map((icon, index) => (
                        <button key={index} className='skillsetBtn'>{icon}</button>
                    ))}
                </div>
            </div>
        </section>
    )
}

