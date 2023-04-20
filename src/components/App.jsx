import { useState } from 'react';
import shuffle from '../utilities/shuffle';
import Card from './Card';

import '../App.css';

function App() {
  const [cards, setCards] = useState(shuffle);
  console.log(cards);

  return (
    <>
      <div className='grid'>
        {cards.map((card) => {
          const { id, image, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={false}
              onClick={() => {}}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
