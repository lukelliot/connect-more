import { useState, useEffect } from 'react'
import './ConnectFour.css';
import { ConnectFourGame, Token } from './state/connect-four-game'

let game: ConnectFourGame
function loadGameGrid() {
  game = new ConnectFourGame()
  return game.grid
}

function ConnectFour() {
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
    <main className={'ConnectFour'}>
      <header className={'Header'}>
        <h1>Connect Four</h1>
        <h3>Player Turn: {currentPlayer}</h3>
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
