import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import GetServerData from '../../services/getServerData';
import toRussiaDate from '../../services/toRussiaDate';

  

export default function GamePage() {
    const { cardId } = useParams();
    const navigate = useNavigate(); // Получение объекта history
    
    const server = new GetServerData();
    const dateTranslator = new toRussiaDate()
    
    const [cardInfo, setInfo] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        server.getGame(cardId)
            .then(game => setInfo(game))
            .catch(()=>setError(true));
    }, [cardId]);
     
    // дата релиза (в российском формате)
    // карусель скриншотов

    return (
        <div>
            <Button onClick={() => navigate('/')}>Back to Main Page</Button>
            {error ? 
            <p>Nfrjuj ytn!</p> 
            :
            <Card>
                <Image src={cardInfo.thumbnail} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{cardInfo.title}</Card.Header>
                    <Card.Description>{cardInfo.genre}</Card.Description>
                    <Card.Description>{cardInfo.publisher}</Card.Description>
                    <Card.Description>{cardInfo.developer}</Card.Description>
                    {
                        cardInfo.minimum_system_requirements ? 
                            Object.keys(cardInfo.minimum_system_requirements).map((key, id)=><Card.Description key={id}>{key}:{cardInfo.minimum_system_requirements[key]}</Card.Description>)
                            : 
                            <p>Loading...</p>
                    }
                    <Card.Description>{dateTranslator.toRussiaDate(cardInfo.release_date)}</Card.Description>
                    {
                        cardInfo.screenshots ? 
                            cardInfo.screenshots.map((item, id)=> <Image src={item.image} wrapped ui={false} key={id} />)
                            :
                            <p>Loading...</p>
                    }
                </Card.Content>
            </Card>}
        </div>
    );
}
