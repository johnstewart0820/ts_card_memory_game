import Head from 'next/head';
import * as React from 'react';

import Card from "../components/index/Card";
import WinModal from "../components/index/WinModal";
import IconButton from "../components/common/IconButton";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import styles from '../styles/Home.module.scss';

import { IMyScore } from "../types/interface";
import { CardStatus } from "../types/enum";
import { UNTOUCHED_SCORE } from "../types/constants";
import { shuffleCards } from "../services/functions";
import { getBestScore, updateBestScore } from "../services/axios";

const client = new W3CWebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);
var openCards: Array<number> = [];

export default function Home() {
  const [showWin, setShowWin] = React.useState<boolean>(false);
  const [myScore, setMyScore] = React.useState<IMyScore>({current:0, best:0});
  const [globalScore, setGlobalScore] = React.useState<number>(0);
  const [cardValues, setCardvalues] = React.useState<Array<number>>([]);
  const [cardsStatus, setCardsStatus] = React.useState<Array<CardStatus>>([
    CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden,
    CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden,
    CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden
  ]);

  const deckRef = React.useRef<HTMLDivElement>();

  // Initalize the card values 
  React.useEffect(() => {
    setCardvalues(shuffleCards());
    getBestScore().then((response) => {
      setGlobalScore(response.data.score);
    })

    client.onmessage = (message) => {
      setGlobalScore(parseInt(message.data));
    };
  }, [])

  // Check if all the cards are matched
  React.useEffect(() => {
    for (let i = 0; i < cardsStatus.length; i ++) {
      if (cardsStatus[i] !== CardStatus.Matched) return;
    }
    if (myScore.best === 0 || myScore.best > myScore.current) {
      setMyScore({...myScore, best: myScore.current});
      updateBestScore(myScore.current);
    }
    
    setShowWin(true);
  }, [cardsStatus])

  const restartgame = () => {
    setCardvalues(shuffleCards());
    setShowWin(false);
    setMyScore({...myScore, current: 0});
    setCardsStatus([
      CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden,
      CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden,
      CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden,CardStatus.Hidden
    ])
  }

  const handleClick = (idx) => {
    setMyScore({...myScore, current: myScore.current + 1});
    openCards.push(idx);

    // Object assign to force re-redner
    let temp = [...cardsStatus];
    temp[idx] = CardStatus.Open;
    setCardsStatus(temp);

    if (openCards.length === 2) { // when 2 cards are open

      if (cardValues[openCards[0]] === cardValues[openCards[1]]) { // when 2 open cars are equal
        temp[openCards[0]] = CardStatus.Matched;
        temp[openCards[1]] = CardStatus.Matched;
        setCardsStatus(temp);
        openCards = [];
      }
      else { // when the 2 cards are different
        temp[openCards[0]] = CardStatus.Unmatched;
        temp[openCards[1]] = CardStatus.Unmatched;
        setCardsStatus(temp);

        // prevent clicks while 2 open cards are being closed.
        deckRef.current.style.pointerEvents = "none";
        setTimeout(() => { 
          // Flip the open cards
          let temp = [...cardsStatus];
          temp[openCards[0]] = CardStatus.Hidden;
          temp[openCards[1]] = CardStatus.Hidden;            
          setCardsStatus(temp);
          openCards = [];
          // stop preventing the clicks
          deckRef.current.style.pointerEvents = "auto";
        }, 750)
      }
    }
  }

  return (
    <div>
      <Head>
        <title>Matching Game - bluePi</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main>
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome to <span>bluePi</span></h1>
          <p>Have fun while training your brain!</p>
          <div className={styles.score}>
            <p>My Clicks: <span>{myScore.current}</span></p>
            <p>My Best: <span>{myScore.best === 0 ? "-" : myScore.best}</span></p>
            <p>Global Best: <span>{globalScore === UNTOUCHED_SCORE ? "-" : globalScore}</span></p>
            <IconButton icon={"/refresh.svg"} text="Restart" onClick={restartgame} />
          </div>

          <div className={styles.deck} ref={deckRef}>
            {cardValues.map((v, idx) => (
              <Card key={`card-${idx}`} value={v} onClick={() => handleClick(idx)} status={cardsStatus[idx]} />)
            )}
          </div>
        </div>
        
        <WinModal isOpen={showWin} onRequestClose={() => setShowWin(false)} restartgame={restartgame} />
      </main>
    </div>
  )
}