import { Form } from 'semantic-ui-react';

const tags = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox',
    'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person',
    'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath',
    'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi',
    'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec',
    'tower-defense', 'horror', 'mmorts'];

export default function TagForm( {handleCheckboxChange}) {
    console.log(handleCheckboxChange);
    return (
    <Form>
      <Form.Group grouped>
     { tags.map((option, id) => (
        <Form.Checkbox 
          key={id}
          label={option}  
          name='tag' 
          value={option}
          onChange={() => handleCheckboxChange(option)}  
          />)) 
      }
      </Form.Group>
    </Form>
    )
}