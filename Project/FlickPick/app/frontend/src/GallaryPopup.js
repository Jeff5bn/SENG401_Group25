import React, { useState,useEffect } from 'react';

function GallaryPopup({}) {

    const [popup, setPopup] = useState(true);

    const togglePopUp = () => {
      if(!popup) {
        return;
      }
    };  
    return (
        <div className='popup'>
          <button onClick={() => togglePopUp(!popup)}>X</button>
        </div>
      );

}
export default GallaryPopup;