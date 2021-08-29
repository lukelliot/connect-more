import { useState, useEffect } from 'react'
import './ConnectMore.css';
import { ConnectMoreGame, Token } from './state/connect-four-game'

let game: ConnectMoreGame
function loadGameGrid() {
  game = new ConnectMoreGame()
  return game.grid
}

function ConnectMore() {
  const [gridState, setGridState] = useState(loadGameGrid)
  const [currentPlayer, setCurrentPlayer] = useState(1)

  useEffect(() => {
    if (game.isWin()) {
      const playAgain = window.confirm(`Player ${currentPlayer} has won the game! Would you like to play again?`)
      if (playAgain) {
        return setGridState(game.newGame())
      }
    }
  }, [currentPlayer])

  const dropToken = (columnIndex: number) => () => {
    const isValidMove = game.takeTurn
      .player(currentPlayer)
      .column(columnIndex)
      .standard()

    if (isValidMove) {
      const nextPlayer = currentPlayer === 1 ? 2 : 1
      setGridState(game.grid)
      setCurrentPlayer(nextPlayer)
    } else {
      alert('invalid move!')
    }
  }

  return (
    <main className={'ConnectMore'}>
      <header className={'Header'}>
        <h1>Connect More</h1>
        <h3>Current Player: {currentPlayer}</h3>
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

export default ConnectMore;
