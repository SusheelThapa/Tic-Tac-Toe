// src/components/CustomStep.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SpeechBubble from './SpeechBubble';

const CustomStep = ({ text }) => {
  return <SpeechBubble>{text}</SpeechBubble>;
};

export default CustomStep;
