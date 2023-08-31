import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Image, Button} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import GetServerData from '../../services/getServerData';
import toRussiaDate from '../../services/date';

const server = new GetServerData();
const dateTranslator = new toRussiaDate();

function NextArrow (props){
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#D4D4D5" }}
        onClick={onClick}
      />
    );
};

function PrevArrow (props){
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#D4D4D5" }}
        onClick={onClick}
      />
    );
};

export default function GamePage({queryClient}) {
    const { cardId } = useParams();
    
    const [card, setCard] = useState('');
    const [error, setError] = useState(false);

    const queryKey = ['game', cardId];

    const { data: game, isError } = useQuery(queryKey, () => server.getGame(cardId), {
        staleTime: 300000, // 5 минут (в миллисекундах)
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    useEffect(() => {
        if (game) {
            setCard(game);
        } else if (isError) {
            setError(true);
        }
    }, [game, isError]);

    // useEffect(()=>{
    //     async function refetch(){
    //         await queryClient.invalidateQueries(queryKey);
    //     }
    //     refetch();
    // }, [isError])
     
    const sliderSyle = {
        width: '85%', /* Укажите нужную ширину */
        margin: '0 auto'
    }

    return (
        <div >
            <Link to="/">
                <Button> Back to Main Page</Button>
            </Link>
            {error ? 
            <div className=""><img src={process.env.PUBLIC_URL + '/img/error.gif'} alt="Spinner" /></div>
            : 
            card ?
            <Card style={{paddingBottom: 10}}>
                <Image src={card.thumbnail} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{card.title}</Card.Header>
                    <Card.Description>{card.genre}</Card.Description>
                    <Card.Description>{card.publisher}</Card.Description>
                    <Card.Description>{card.developer}</Card.Description>
                    {
                        card.minimum_system_requirements 
                        && 
                        Object.keys(card.minimum_system_requirements).map((key, id)=><Card.Description key={id}>{key}:{card.minimum_system_requirements[key]}</Card.Description>)
                    }
                    <Card.Description>{card.release_date && dateTranslator.toRussiaDate(card.release_date)}</Card.Description>
                    <Card.Header>Screenshots:</Card.Header>
                    {
                        <div style={sliderSyle}>
                            <Slider {...settings}>
                            {
                                card.screenshots
                                    .map((item, id)=> 
                                        <div key={id}> 
                                            <Image src={item.image} size='medium' wrapped key={id} />
                                        </div>)
                            }
                            </Slider>
                        </div>
                    }
                </Card.Content>
            </Card> 
            :
            <div className=""><img src={process.env.PUBLIC_URL + '/img/spinner.gif'} alt="Spinner" /></div>
            }
        </div>
    );
}
