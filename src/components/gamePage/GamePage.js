import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react';

import GetServerData from '../../services/getServerData';
import GameCard from './childs/GameCard';
import {ErrorBlock, LoadingBlock} from '../StatusBlocks/StatusBlocks';

const server = new GetServerData();

export default function GamePage({queryClient}) {
    const { cardId } = useParams();
    
    const [card, setCard] = useState('');
    const [error, setError] = useState(false);

    const queryKey = ['game', cardId];

    const { data: game, isError } = useQuery(queryKey, () => server.getGame(cardId), {
        staleTime: 300000, // 5 минут (в миллисекундах)
    });

    useEffect(() => {
        if (game) {
            setCard(game);
        } else if (isError) {
            setError(true);
        }
    }, [game, isError]);

    const loadDone = Boolean(card);

    return (
        <div >
            {isError ? <ErrorBlock/>
            : 
            loadDone ? <GameCard card={card}></GameCard>
            :
            <div className="">
            <Link to="/">
                <Button>На главную</Button>
            </Link>
            <LoadingBlock/></div>
            }
        </div>
    );
}
