import { useEffect, useState } from 'react';
import shuffle from '../utilities/shuffle';
import Card from './Card';
import Header from './Header';

import '../App.css';

function App() {
  const [cards, setCards] = useState(shuffle); //state to track randomized cards array
  const [firstPick, setFirstPick] = useState(null); //state to track users first picked card each turn
  const [secondPick, setSecondPick] = useState(null); //state to track users second picked card each turn
  const [disabled, setDisabled] = useState(null); //state to temporarily disable click handling after second pick
  const [wins, setWins] = useState(0); //state to track number of wins

  const handleClick = (card) => {
    if (!disabled) {
      firstPick ? setSecondPick(card) : setFirstPick(card);
    }
  };

  const handleTurn = () => {
    setFirstPick(null);
    setSecondPick(null);
    setDisabled(false);
  };

  //function for handling game restart
  const handleNewGame = () => {
    handleTurn();
    setCards(shuffle);
  };

  //useEffect for after two cards have been picked
  useEffect(() => {
    let pickTimer;

    //if two cards have been clicked
    if (firstPick && secondPick) {
      //check if the cards are the same
      if (firstPick.image === secondPick.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === firstPick.image) {
              //Update card property to reflect matched
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleTurn();
      } else {
        //prevent further selection until after delay
        setDisabled(true);
        //add a delay in between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, firstPick, secondPick]);

  //useEffect for if player has found all matches, handle accordingly
  useEffect(() => {
    //check for remaining unmatched cards
    const checkWin = cards.filter((card) => !card.matched);

    //all matches made, handle win
    if (cards.length && checkWin.length < 1) {
      console.log('You win!');
      setWins((prevWinCount) => {
        return prevWinCount + 1;
      });
      handleNewGame();
    }
  }, [cards, wins]);

  return (
    <>
      <Header
        wins={wins}
        handleNewGame={handleNewGame}
      />
      <div className='grid'>
        {cards.map((card) => {
          const { id, image, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={card === firstPick || card === secondPick || matched}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
