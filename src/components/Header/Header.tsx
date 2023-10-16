import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import './Header.css';
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { HeaderD } from './HeaderDesk/HeaderD';
import { HeaderM } from './HeaderMobile/HeaderM';

export const Header = () => {
    const [showComponent, setShowComponent] = useState(true);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 1300) {
                setShowComponent(false);
            } else {
                setShowComponent(true);
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return showComponent ? <HeaderD /> : <HeaderM />;
}

