import React, { useState } from "react";
import './Switch.css'

export const Switch = ({handleActive,index}) => {
     const [isOn, setIsOn] = useState(true);

     const handleToggle = () => {
          setIsOn(!isOn);
          handleActive(index)
     };

     return (
          <div className='switch-container abled' >
               <label className='switch'>
                    <input
                         type='checkbox'
                         checked={isOn}
                         onChange={handleToggle}
                    />
                    <span className='slider round'></span>
               </label>
          </div>
     );
};
