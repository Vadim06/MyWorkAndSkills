import React, { useState, ChangeEvent } from 'react';
import { Outlet, Link } from "react-router-dom";
import './HeaderM.css';
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { SiStarship } from "react-icons/si";

export const HeaderM = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
    };

    return (
        <>
            <div className={`headerMobile ${isChecked ? 'rollOut' : ''}`}>
                <div className='topMenuContainer'>
                    <p>Vadym Mykhailets</p>
                    <nav className='hamNav'>
                        <label>
                            <input className='hamBox' checked={isChecked} onChange={handleCheckboxChange} type="checkbox" />
                            <span className='hamLine'></span>
                        </label>
                    </nav>
                </div>
                <ul className='navbarItemsContainerMobile'>
                    <li className='navbarItem' onClick={() => { setIsChecked(false) }}><Link to="/"><AiOutlineHome /><p>Home</p></Link></li>
                    <li className='navbarItem' onClick={() => { setIsChecked(false) }}><Link to="/about"><AiOutlineUser /><p>About</p></Link></li>
                    <li className='navbarItem' onClick={() => { setIsChecked(false) }}><Link to="/swapi"><SiStarship /><p>SWAPI</p></Link></li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}

