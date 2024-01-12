// buttonControl.js

import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import styles from './button.module.css';

function ButtonControl() {
    const [sliderValue, setSliderValue] = useState(70);
    const [lastClickedButton, setLastClickedButton] = useState(null);
    const [clickedButton, setClickedButton] = useState(null);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        console.log('Last Clicked Button:', lastClickedButton);
        console.log('Slider Value:', newValue);
    };

    const handleButtonClick = (buttonColor) => {
        setLastClickedButton(buttonColor);
        setClickedButton(buttonColor); // 클릭된 버튼 업데이트
        console.log('Last Clicked Button:', buttonColor);
        console.log('Slider Value:', sliderValue);
    };

    return (
        <div>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{width: 200}}>
                    <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                    />
                    <Typography gutterBottom>Value: {sliderValue}</Typography>
                </Box>
            </Box>

            <div style={{marginTop: '20px', textAlign: 'center'}}>
                <button
                    className={`${styles.redButton} ${clickedButton === 'Red' ? styles.clickedRed : ''}`}
                    onClick={() => handleButtonClick('Red')}
                >
                    Red
                </button>
                <button
                    className={`${styles.greenButton} ${clickedButton === 'Green' ? styles.clickedGreen : ''}`}
                    onClick={() => handleButtonClick('Green')}
                >
                    Green
                </button>
                <button
                    className={`${styles.blueButton} ${clickedButton === 'Blue' ? styles.clickedBlue : ''}`}
                    onClick={() => handleButtonClick('Blue')}
                >
                    Blue
                </button>
            </div>


            <div style={{marginTop: '10px', textAlign: 'center'}}>
                Last Clicked Button: {lastClickedButton}

            </div>

        </div>
    );
}

export default ButtonControl;
