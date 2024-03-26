import React, { useState } from 'react';
import './HelpPanel.css';

function Instructions() {
  const [showPopout, setShowPopout] = useState(false);

  const togglePopout = () => {
    setShowPopout(!showPopout);
  };

  return (
    <div>
      <button onClick={togglePopout} className="help-button">?</button>
      <div className={`popout ${showPopout ? 'show' : ''}`}>
        <div className='popout-content'>
        <p>To like a movie, swipe right or click the <b>&#9829;</b> button</p>
        <p>To dislike a movie, swipe left or click the <b>X</b> button</p>
        <p>To skip a movie, swipe up or click the <b>&#8634;</b> button</p>
        <p>To see recommended movies based on your interests, click the See Recommendations button</p>
        </div>
      </div>
    </div>
  );
}

export default Instructions;