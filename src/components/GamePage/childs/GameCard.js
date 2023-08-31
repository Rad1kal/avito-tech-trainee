import { Card, Image, Button, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import {toRussiaDate} from '../../../services/date';
import Slider from '../../Slider/Slider';

import './GameCard.css';

export default function GameCard({card }) {
    return(
    <Card id='game-card' fluid >
        <Card.Content textAlign='center'>
            <Image size='medium' src={card.thumbnail} wrapped />
            <Card.Content textAlign='left'>
                <Header>{card.title}</Header>
                <Card.Description>{`genre: ${card.genre}`}</Card.Description>
                <Card.Description>{`publisher: ${card.publisher}`}</Card.Description>
                <Card.Description>{`developer: ${card.developer}`}</Card.Description>
                {
                    card.minimum_system_requirements 
                    && 
                    Object.keys(card.minimum_system_requirements).map((key, id)=><Card.Description key={id}>{key}: {card.minimum_system_requirements[key]}</Card.Description>)
                }
                <Card.Description>{card.release_date && toRussiaDate(card.release_date)}</Card.Description>
            </Card.Content>
            <Card.Header >Screenshots:</Card.Header>
            {
                <div className='slider-block'>
                    <Slider card={card}></Slider>
                </div>
            }
            <Link to="/">
                <Button>На главную</Button>
            </Link>
        </Card.Content>
    </Card> )
}
