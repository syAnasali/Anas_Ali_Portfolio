import { ArrowDown } from "lucide-react";
import React, { useState, useEffect } from 'react';

export const HeroSection = () => {

  const fullFirstName = 'Anas';
  const firstClassName = 'text-primary'; 
  const fullLastName = 'Ali';
  const lastClassName = 'text-gradient ml-2';

 
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 1500;
  const shortPause = 400;

  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
 
  const [phase, setPhase] = useState('TYPING_FIRST');

 
  useEffect(() => {
    let timer;

    
    switch (phase) {
      case 'TYPING_FIRST': {
        if (firstName !== fullFirstName) {
          timer = setTimeout(() => {
            setFirstName(fullFirstName.substring(0, firstName.length + 1));
          }, typingSpeed);
        } else {
          timer = setTimeout(() => {
            setPhase('TYPING_LAST');
          }, shortPause);
        }
        break;
      }

      case 'TYPING_LAST': {
        if (lastName !== fullLastName) {
          timer = setTimeout(() => {
            setLastName(fullLastName.substring(0, lastName.length + 1));
          }, typingSpeed);
        } else {
          timer = setTimeout(() => {
            setPhase('DELETING_LAST');
          }, pauseDuration);
        }
        break;
      }

      case 'DELETING_LAST': {
        if (lastName !== '') {
          timer = setTimeout(() => {
            setLastName(fullLastName.substring(0, lastName.length - 1));
          }, deletingSpeed);
        } else {
          timer = setTimeout(() => {
            setPhase('DELETING_FIRST');
          }, shortPause);
        }
        break;
      }

      case 'DELETING_FIRST': {
        if (firstName !== '') {
          timer = setTimeout(() => {
            setFirstName(fullFirstName.substring(0, firstName.length - 1));
          }, deletingSpeed);
        } else {
          timer = setTimeout(() => {
            setPhase('TYPING_FIRST');
          }, pauseDuration);
        }
        break;
      }

      default:
        setPhase('TYPING_FIRST');
    }

  
    return () => clearTimeout(timer);
  }, [firstName, lastName, phase]); 
 

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            style={{ minHeight: '80px' }}>
            
            <span className="opacity-0 animate-fade-in"> Hi, I'm</span>

            
            <span className={` ${firstClassName}`}> {firstName}</span>

            
            <span className={` ${lastClassName}`}>
              
              {lastName.length > 0 ? ' ' : ''}
              {lastName}
            </span>

            
            <span className="text-primary animate-pulse">|</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            I am Full-Stack Innovator Blending Multiple Domains to Build Smart,
            Scalable, and Impactful Solutions. From Web Apps to Smart Machines —
            I Build Tech That Makes a Difference.
          </p>
          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
