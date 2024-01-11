// buttonControl.js

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import styles from './button.module.css';

function ButtonControl() {
    const [sliderValue, setSliderValue] = useState(70);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: 200 }}>
                    <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                    />
                    <Typography gutterBottom>Value: {sliderValue}</Typography>
                </Box>
            </Box>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button className={styles.redButton}>Red</button>
                <button className={styles.greenButton}>Green</button>
                <button className={styles.blueButton}>Blue</button>
            </div>
        </div>
    );
}

export default ButtonControl;
