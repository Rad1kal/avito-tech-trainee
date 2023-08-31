import { useEffect, useState } from 'react';
import { Accordion, Menu, Grid, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'react-virtualized';

import { setSelectedTags, setPlatform, setError, setCards, setSort, setLoading } from '../../../redux/actions';
import GetServerData from '../../../services/getServerData';
import {toRussiaDate} from '../../../services/date';
import PlatformForm from '../../PlatformForm/PlatformForm';
import TagForm from '../../TagFrom/TagForm';
import { LoadingBlock } from '../../StatusBlocks/StatusBlocks';

import './MainPage.css';

const noGamesBlock = (<div className='no-game'>
        Игр с нужными требованиями нет!
    </div>)

export default function GamesBlock({gameGrid, filterGrid}) {
    const error = useSelector(state => state.error); // код ошибки
    const selectedSort = useSelector(state => state.selectedSort);// выбранная сортировка
    const cards = useSelector(state => state.cards);// список карточек
    const selectedTags = useSelector(state => state.selectedTags);// выбранные пункты списка
    const selectedPlatform = useSelector(state => state.selectedPlatform);// выбранная платформа
    const isLoading = useSelector(state => state.isLoading);

    const dispatch = useDispatch();
    const server = new GetServerData();

    useEffect(()=>{
        dispatch(setLoading(true));
        server.getGames(selectedSort, selectedTags.join('.'), selectedPlatform)
          .then(ans => {
            dispatch(setCards(ans))
            dispatch(setLoading(false))
          })
          .catch(err=>{
            dispatch(setError(`${err.message}`))
            dispatch(setLoading(false))
          });
      }, [selectedSort, selectedTags, selectedPlatform])

    const [activeTag, setActive] = useState(false); // Исправить на Redux

    const handlePlatform = (value)=>dispatch(setPlatform(value))

    const handleCheckboxChange = (option) => {
        if (selectedTags.includes(option)) {
          dispatch(setSelectedTags(selectedTags.filter(item => item !== option)));
        } else {
          dispatch(setSelectedTags([...selectedTags, option]));
        }
    };

    const isError = Boolean(error);
    const noGames = cards.length === 0;
    return (
        <Grid celled>
            <div className='main-page-head'>
                <h1>Бесплатные игры</h1>
                <select  value={selectedSort} onChange={(e)=>dispatch(setSort(e.target.value))}>
                    <option value="popularity">По популярности</option>
                    <option value="release-date">По дате релиза</option>
                    <option value="alphabetical">По алфавиту</option>
                </select>
            </div>
                <Grid.Row >
                <Grid.Column width={gameGrid}>
                <Card.Group id='card-group' centered>
                    {isError ? <p>Ошибка: {error}</p>
                    : 
                    isLoading ? <LoadingBlock/>
                    :
                    noGames ? noGamesBlock 
                    :
                    cards.map(card => (
                        <Link to={`/card/${card.id}`} key={card.id}>
                            <Card>
                                <Image src={card.thumbnail} wrapped ui={false} />
                                <Card.Content>
                                <Card.Header>{card.title}</Card.Header>
                                <Card.Description>{card.genre}</Card.Description>
                                <Card.Description>{card.publisher}</Card.Description>
                                <Card.Description>{toRussiaDate(card.release_date)}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Link>
                    ))
                    }
                </Card.Group>
                </Grid.Column>
                <Grid.Column width={filterGrid}>
                <Accordion as={Menu} vertical>
                    <Menu.Item>
                    <Accordion.Title
                        active={activeTag === 'tag'}
                        content='Жанр игры'
                        onClick={()=> activeTag !== 'tag' ? setActive('tag'): setActive('')}
                    />
                    <Accordion.Content active={activeTag === 'tag'} content={<TagForm handleCheckboxChange={handleCheckboxChange}/>} />
                    </Menu.Item>
                </Accordion>
                <Accordion as={Menu} vertical>
                    <Menu.Item>
                    <Accordion.Title
                        active={activeTag === 'platform'}
                        content='Платформа'
                        onClick={()=>activeTag !== 'platform' ? setActive('platform') : setActive('')}
                    />
                    <Accordion.Content active={activeTag === 'platform'} content={<PlatformForm handlePlatform={handlePlatform} selectedPlatform={selectedPlatform}/>} />
                    </Menu.Item>
                </Accordion>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
