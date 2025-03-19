import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import './HeaderD.css';
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { SiStarship } from "react-icons/si";

export const HeaderD = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY >= 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <div className={`header ${isSticky ? 'sticky' : ''}`} >
                <nav id="navbar">
                    <ul className='navbarItemsContainer'>
                        <li className='navbarItem navbarItemDesk'><Link to="/"><AiOutlineHome /><p>Home</p></Link></li>
                        <li className='navbarItem navbarItemDesk'><Link to="/about"><AiOutlineUser /><p>About</p></Link></li>
                        <li className='navbarItem navbarItemDesk'><Link to="/swapi"><SiStarship /><p>SWAPI</p></Link></li>
                    </ul>
                </nav>

            </div>
            <Outlet />
        </>
    )
}

