import { Image } from 'semantic-ui-react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow (props){
const { className, style, onClick } = props;
return (
  <div
    className={className}
    style={{ ...style, display: "block",borderRadius: '50%', background: "#D4D4D5", padding: 1 }}
    onClick={onClick}
  />
);
};

function PrevArrow (props){
const { className, style, onClick } = props;
return (
  <div
    className={className}
    style={{ ...style, display: "block", background: "#D4D4D5", borderRadius: '50%', padding: 1 }}
    onClick={onClick}
  />
);
};

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
};


export default function SliderItem({card}) {
  return (
    <Slider {...settings}>
    {
        card.screenshots
            .map((item, id)=> 
                <div key={id}> 
                    <Image src={item.image} size='medium' wrapped key={id} />
                </div>)
    }
    </Slider>
  )
}
