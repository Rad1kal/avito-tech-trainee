import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { Checkbox, Button, Sidebar, Segment, Radio } from 'semantic-ui-react';
import GetServerData from '../../services/getServerData';
import toRussiaDate from '../../services/toRussiaDate';

export default function MainPage({ cards, error }) {
  const dateTranslator = new toRussiaDate()
  const server = new GetServerData();
  const [selectedSort, setSort] = useState(""); // выбранная сортировка
  const [cardsList, setCards] = useState([]); // хранение списка карточек для сортировок
  const [showAllTags, setShowAllTags] = useState(false); // состояние списка жанров (развёрнут\свёрнут)
  const [selectedTags, setSelectedTags] = useState([]); // выбранные пункты списка
  const [selectedPlatform, setPlatform] = useState('all'); // выбранная платформа
  
  // установка нового набора карточек
  useEffect(()=>{
    setCards(cards);
  }, [cards]);

  // получение отсортированного набора карточек
  useEffect(()=>{
    if (!error){
    server.getGames(selectedSort, selectedTags.join('.'), selectedPlatform)
      .then(games => setCards(games));
    }
  }, [selectedSort, selectedTags, selectedPlatform])

  // Настройки сайдбара
  const tags = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox',
    'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person',
    'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath',
    'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi',
    'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec',
    'tower-defense', 'horror', 'mmorts'];

  const displayedTags = showAllTags ? tags : tags.slice(0, 5);

  const platforms = ['pc', 'browser', 'all'];

  const handleCheckboxChange = (option) => {
    if (selectedTags.includes(option)) {
      setSelectedTags(selectedTags.filter(item => item !== option));
    } else {
      setSelectedTags([...selectedTags, option]);
    }
    console.log(selectedTags);
  };

  const listStyles = {
    minHeight: 'calc(100vh - 90px)' // Высота экрана минус высота заголовка и других элементов
  };

  const sidebarStyles = {

  }

  return (
    <div>
      <h1>Card Catalog</h1>
      {/* // дата релиза (в российском формате)*/}
      {console.log('Рендер')}
      <select  value={selectedSort} onChange={(e)=>setSort(e.target.value)}>
        <option value=""></option>
        <option value="popularity">По популярности</option>
        <option value="release-date">По дате релиза</option>
        <option value="alphabetical">По алфавиту</option>
        {/* <option value="relevance">По релевантности</option> */}
      </select>
      <Sidebar.Pushable style={listStyles} as={Segment}>
        <Sidebar
          as={Segment}
          animation="push"
          direction="left"
          visible
          // style={}
        >
          <div>
            <h3>Options</h3>
            <ul style={{listStyle: 'none', padding: 0}}>
              {displayedTags.map((option, id) => (
                <li key={id}>
                  <Checkbox 
                    checked={selectedTags.includes(option)} 
                    onChange={() => handleCheckboxChange(option)}
                    label={option} 
                    key={option} />
                </li>
              ))}
            </ul>
            <Button onClick={()=>setShowAllTags(!showAllTags)}>Show All</Button>
          </div>
          <div>
          <h3>Options</h3>
            <ul style={{listStyle: 'none', padding: 0}}>
              {platforms.map((platform, id) => (
                <li key={id}>
                 <Radio
                    label={platform}
                    name='radioGroup'
                    value={platform}
                    checked={platform === selectedPlatform}
                    onChange={(e, {value})=>setPlatform(value)}/>
                </li>
              ))}
            </ul>
          </div>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic>
            <Card.Group style={{minHeight: '100%'}}>
              {error ? 
              <p>404</p>
              : 
              cardsList.length ? 
                cardsList.map(card => (
                  <Link to={`/card/${card.id}`} key={card.id}>
                    <Card>
                      <Image src={card.thumbnail} wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>{card.title}</Card.Header>
                        <Card.Description>{card.genre}</Card.Description>
                        <Card.Description>{card.publisher}</Card.Description>
                        <Card.Description>{dateTranslator.toRussiaDate(card.release_date)}</Card.Description>
                      </Card.Content>
                    </Card>
                  </Link>
              ))
              :
              <p>Игр нет!</p>}
            </Card.Group>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}
