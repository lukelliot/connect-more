import { useState } from 'react'
import './ConnectFour.css';
import { ConnectFourGame, Token } from './state/connect-four-game'

let game: ConnectFourGame
function loadGameGrid() {
  game = new ConnectFourGame()
  return game.grid
}

function ConnectFour() {
  const [gridState, updateGridState] = useState(loadGameGrid)
  const [playerNumber, nextPlayer] = useState(1)

  const dropToken = (columnIndex: number) => () => {
    const forPlayerTurn = game.takeTurn.player(playerNumber).column(columnIndex)
    const isValidMove = forPlayerTurn.drop.standardToken()


    if (isValidMove) {
      updateGridState(game.grid)
      nextPlayer(playerNumber === 1 ? 2 : 1)
      if (game.isWin()) {
        alert(`Player ${playerNumber} has won the game!`)
      }
    } else {
      alert('invalid move!')
    }
  }

  return (
    <main className={'ConnectFour'}>
      <header className={'Header'}>
        <h1>Connect Four</h1>
        <h3>Player Turn: {playerNumber}</h3>
      </header>
      <div className={'Game'}>
        <div className={'Grid'}>
          {gridState.map((column: Token[], columnIndex: number) => (
            <div className={'Column'} onClick={dropToken(columnIndex)}>
              {column.map(({ player }: Token) => (
                <div className={`Token player-${player}`}>
                  {player}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ConnectFour;
