import {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from "./HomeCarousel.module.css";
import {Link, useNavigate} from 'react-router-dom';
function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
    <div  className={styles.parentContainer}>
        <Carousel activeIndex={index} onSelect={handleSelect} className={styles.customCarousel}>
            <Carousel.Item>
                {/*<ExampleCarouselImage text="First slide" />*/}
                <Link  to={'/product/9'}><img className={styles.customCarouselImg} src={process.env.PUBLIC_URL + '/img/Panda_Ramen.png'}/></Link>

                <Carousel.Caption>

                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <Link to={'/product/7'}> <img className={styles.customCarouselImg} src={process.env.PUBLIC_URL + '/img/SamsungBrandWeek.png'}/></Link>
                {/*<ExampleCarouselImage text="First slide" />*/}
                <Carousel.Caption>

                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <Link to={'/product/8'}><img className={styles.customCarouselImg} src={process.env.PUBLIC_URL + '/img/Hanpa43.png'}/></Link>
                {/*<ExampleCarouselImage text="First slide" />*/}
                <Carousel.Caption>

                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>



    );
}

export default ControlledCarousel;