import React, { useState, useEffect } from 'react';
import './Text.css';

interface IText {
  text: string;
  typingSpeed: number;
}

export const Text = ({ text, typingSpeed }: IText) => {
  const [displayedText, setDisplayedText] = useState<string>('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, typingSpeed);

    return () => {
      clearInterval(intervalId);
    };
  }, [text, typingSpeed]);

  return <span className='typingText'>{displayedText}<span className='cursor'>|</span></span>;
}

