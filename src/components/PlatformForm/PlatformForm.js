import { Form } from 'semantic-ui-react';

const platforms = ['pc', 'browser', 'all'];

export default function PlatformForm ({handlePlatform, selectedPlatform}) {
    return (
    <Form>
      <Form.Group grouped>
      {platforms.map((platform, id) => (
        <Form.Radio 
          key={id}
            label={platform}
            name='radioGroup'
            value={platform}
            checked={platform === selectedPlatform}
            onChange={(e, {value}) => handlePlatform(value)}
            />
      ))}
      </Form.Group>
    </Form>
    )
}