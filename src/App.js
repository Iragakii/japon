import './App.css';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import getCountForElement from './utils/countContent';
import Day4 from './japonCPN/Day4';
import Day5 from './japonCPN/Day5';
import ButtonNextSlide from './japonCPN/btn/buttonNextSlide';
import Day6 from './japonCPN/Day6';

function App() {
  const slides = useMemo(() => [<Day4 key="day4" />, <Day5 key="day5" /> ,<Day6 key="day6" />], []);
  const [index, setIndex] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const trackRef = useRef(null);

  const handleNext = () => {
    setIndex((i) => Math.min(i + 1, slides.length - 1));
  };

  const handlePrev = () => {
    setIndex((i) => Math.max(i - 1, 0));
  };

  useEffect(() => {
    const computeCount = () => {
      if (!trackRef.current) return setWordCount(0);
      const slidesEl = trackRef.current.querySelectorAll('.slide');
      const active = slidesEl && slidesEl[index];
      if (!active) return setWordCount(0);
      const countEl = active.querySelector('.count');
      if (!countEl) return setWordCount(0);
      setWordCount(getCountForElement(countEl, { mode: 'beforeColon' }));
    };

    computeCount();
  }, [index]);

  return (
    <div className="App">
      <div className="slides">
        <div className="slides-track" ref={trackRef} style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, i) => (
            <div className="slide" key={i}>
              {slide}
              {i === index && (
                <div className="slide-count ">新词汇 : {wordCount}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <ButtonNextSlide onClick={handlePrev} label="Prev" disabled={index === 0} />
        <ButtonNextSlide onClick={handleNext} label="Next" disabled={index === slides.length - 1} />
      </div>
    </div>
  );
}

export default App;
