import './Slider.css';
import {useState, useEffect} from 'react';

type SliderProps = {
    sliderActive: boolean,
    handleSliderClick: () => void
}

export default function Slider(props: SliderProps){

    const [sliderClasses, setSliderClasses] = useState("slider-control" as string);
    const [sliderContainerClasses, setSliderContainerClasses] = useState("slider-container" as string);

    useEffect(() => {
        if(props.sliderActive){
            setSliderClasses("slider-control slider-control-on");
            setSliderContainerClasses("slider-container slider-container-on");
        } else {
            setSliderClasses("slider-control");
            setSliderContainerClasses("slider-container")
        }
        console.log("Slider", props.sliderActive);

    }, [props.sliderActive])


    return(
        <div className={sliderContainerClasses} onClick={props.handleSliderClick}>
            <div className={sliderClasses}>

            </div>
        </div>
    )
}