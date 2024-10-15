import React, { useState, useEffect } from "react";
import { FormData } from "../app/page";
import Confetti from 'react-confetti';
import Button from "./Button";

interface EndScreenProps {
  formData: FormData;
}

const EndScreen: React.FC<EndScreenProps> = ({ formData }) => {
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });
  const [confettiOpacity, setConfettiOpacity] = useState(1);
  const [isConfettiActive, setIsConfettiActive] = useState(true);

  useEffect(() => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });

    const fadeOutConfetti = () => {
      setConfettiOpacity((prevOpacity) => {
        if (prevOpacity <= 0.1) {
          setIsConfettiActive(false);
          return 0;
        }
        return prevOpacity - 0.02;
      });
    };

    const confettiInterval = setInterval(fadeOutConfetti, 100);
    const confettiTimeout = setTimeout(() => clearInterval(confettiInterval), 5000);

    return () => {
      clearInterval(confettiInterval);
      clearTimeout(confettiTimeout);
    };
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Growvy!',
        text: `Hey! I just signed up for Growvy, an awesome business learning app. You should check it out!`,
        url: 'https://growvy.app', // Replace with your actual URL
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share API is not supported in your browser. You can manually share the link: https://growvy.app');
    }
  };

  return (
    <div className="text-center">
      {isConfettiActive && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          opacity={confettiOpacity}
          recycle={false}
          numberOfPieces={200}
          colors={['#786AFE', '#9370DB', '#8A2BE2', '#9932CC', '#BA55D3']} // Various purple shades
        />
      )}
      <h2 className="title-gradient text-6xl leading-[0.9] mb-2">Thank you, {formData.name}!</h2>
      <p className="text-xl mb-4">You&apos;ll be among the first to know when Growvy launches.</p>
      <p className="text-xl mb-8">Stay tuned for exciting updates!</p>
      <Button onClick={handleShare} variant="secondary">
        Share with a friend
      </Button>
    </div>
  );
};

export default EndScreen;
