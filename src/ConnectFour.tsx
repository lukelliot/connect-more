import { useState } from 'react'
import './ConnectFour.css';
import { ConnectFourGame } from './state/connect-four-game'

let game
function loadGameState() {
  game = new ConnectFourGame()
  return game.grid
}

function ConnectFour() {
  const [gridState, updateGridState] = useState(loadGameState)

  return (
    <main className={'ConnectFour'}>
      <header className={'Header'}>
        <h1>Connect Four</h1>
      </header>
      <div className={'Game'}>
        <div className={'Grid'}>
          {gridState.map(column => (
            <div className={'Column'}>
              {column.map(player => (
                <div className={'Position'}>{player}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ConnectFour;
