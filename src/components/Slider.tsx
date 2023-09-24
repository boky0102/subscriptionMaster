import './Slider.css';
import {useState, useEffect} from 'react';

type SliderProps = {
    sliderActive: boolean | undefined,
    handleSliderClick: () => void
}

export default function Slider(props: SliderProps){

    const [sliderClasses, setSliderClasses] = useState("slider-control" as string);
    const [sliderContainerClasses, setSliderContainerClasses] = useState("slider-container" as string);

    useEffect(() => {
        if(!props.sliderActive || props.sliderActive === undefined){
            setSliderClasses("slider-control");
            setSliderContainerClasses("slider-container");
        } else {
            setSliderClasses("slider-control slider-control-on");
            setSliderContainerClasses("slider-container slider-container-on");
        }

    }, [props.sliderActive])


    return(
        <div className={sliderContainerClasses} onClick={props.handleSliderClick}>
            <div className={sliderClasses}>

            </div>
        </div>
    )
}