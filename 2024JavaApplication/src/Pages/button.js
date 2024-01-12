// buttonControl.js

import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import styles from './button.module.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ButtonControl() {
    const [sliderValue, setSliderValue] = useState(70);
    const [lastClickedButton, setLastClickedButton] = useState(null);
    const [clickedButton, setClickedButton] = useState(null);
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);
    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        console.log({ color:clickedButton, value:newValue});


        // 슬라이더 값이 변경될 때 서버에 데이터를 전달합니다.
        // 여기서는 POST 요청을 사용하며, serverAddr를 사용해 실제 서버 주소를 지정해야 합니다.
        axios.post(`${serverAddr}/api/controller`, { color:clickedButton, value:newValue})
            .then(response => {
                console.log('Slider value sent to the server:', response.data);
            })
            .catch(error => {
                console.error('Error sending slider value to the server:', error);
            });
    };

    const handleButtonClick = (buttonColor) => {
        setLastClickedButton(buttonColor);
        setClickedButton(buttonColor); // 클릭된 버튼 업데이트
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
                    className={`${styles.redButton} ${clickedButton === 'R' ? styles.clickedRed : ''}`}
                    onClick={() => handleButtonClick('R')}
                >
                    Red
                </button>
                <button
                    className={`${styles.greenButton} ${clickedButton === 'G' ? styles.clickedGreen : ''}`}
                    onClick={() => handleButtonClick('G')}
                >
                    Green
                </button>
                <button
                    className={`${styles.blueButton} ${clickedButton === 'B' ? styles.clickedBlue : ''}`}
                    onClick={() => handleButtonClick('B')}
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
