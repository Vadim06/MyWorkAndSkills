import React, { useState, useEffect } from 'react';
import './About.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import me from '../../img/me.jpg'
import { AiOutlineHtml5 } from "react-icons/ai";
import { ImCss3 } from "react-icons/im";
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";
import { BiLogoReact, BiGitBranch } from "react-icons/bi";
import { RiBootstrapLine } from "react-icons/ri";
import { CiDumbbell } from "react-icons/ci";
import { MdVideoSettings } from "react-icons/md";
import { GiGuitar } from "react-icons/gi";
import { FaCameraRetro } from "react-icons/fa";
import { CarouselProvider, Slider, Slide, Image, ButtonBack, ButtonNext } from 'pure-react-carousel';
const icons = [
    <AiOutlineHtml5 size={'5rem'} />,
    <ImCss3 size={'4rem'} />,
    <TbBrandJavascript size={'5rem'} />,
    <BiLogoReact size={'5rem'} />,
    <TbBrandTypescript size={'5rem'} />,
    <BiGitBranch size={'5rem'} />,
    <RiBootstrapLine size={'5rem'} />
]

const hobbyIcons = [
    <CiDumbbell className='hobbyImg dumbbell' size={'10rem'} />,
    <FaCameraRetro className='hobbyImg' size={'6.8rem'} />,
    <MdVideoSettings className='hobbyImg' size={'6.6rem'} />,
    <GiGuitar className='hobbyImg' size={'7rem'} />
]

const hobbyTexts = [
    <p className='hobbyText'>Working out</p>,
    <p className='hobbyText'>Photography</p>,
    <p className='hobbyText'>Video editing</p>,
    <p className='hobbyText'>Guitar</p>
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
                    <div className='hobbies'>
                        <h6>Some of my <span>hobbies</span></h6>
                        <CarouselProvider
                            naturalSlideWidth={60}
                            naturalSlideHeight={20}
                            totalSlides={4}
                            isPlaying={true}
                            infinite={true}
                        >
                            <Slider className='sliderHobby'>
                                {hobbyIcons.map((icon, index) => (
                                    <Slide key={index} index={index}>
                                        {icon}
                                        {hobbyTexts[index]}
                                    </Slide>
                                ))}
                            </Slider>
                            <div className='hobbyBtns'>
                                <ButtonBack><span className='prev'></span></ButtonBack>
                                <ButtonNext><span className='next'></span></ButtonNext>
                            </div>
                        </CarouselProvider>
                    </div>

                </div>
                <div className='meContainer'>
                    <img src={me} alt="me" className='me' />
                </div>
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

