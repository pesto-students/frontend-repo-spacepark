import React, { useState, useEffect } from 'react';
import HomeIcon from '../assets/home.svg';
import SmallLogo from './Logo/SmallLogo';
import './Home.scss';

const Screen1 = () => {
  return (
    <>
      <h1>Welcome to the Car Parking App</h1>
      <p>Your no.1 parking assistant</p>
      <img src={HomeIcon} alt="Home Icon" />
      {/* Add more content and UI elements */}
    </>
  );
};

const Screen2 = () => {
  return (
    <>
      <h1>Screen 2</h1>
      <p>Your no.2 screen content</p>
      {/* Add more content and UI elements */}
    </>
  );
};

const Screen3 = () => {
  return (
    <>
      <h1>Screen 3</h1>
      <p>Your no.3 screen content</p>
      {/* Add more content and UI elements */}
    </>
  );
};

const Screen4 = () => {
  return (
    <>
      <h1>Screen 4</h1>
      <p>Your no.4 screen content</p>
      {/* Add more content and UI elements */}
    </>
  );
};

const Home = () => {
  const screens = [<Screen1 />, <Screen2 />, <Screen3 />, <Screen4 />];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % screens.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [screens.length]);

  return (
    <div className='home-page'>
      <div className=''>
        <SmallLogo />
        {screens[currentIndex]}
      </div>
    </div>
  );
};

export default Home;
