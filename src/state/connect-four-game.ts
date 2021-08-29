type PlayerOne = 1

type PlayerTwo = 2

type PlayersUnion = PlayerOne | PlayerTwo

interface TokenType {
  STANDARD: 'STANDARD'
}

type TokenTypesUnion = keyof TokenType

interface Token {
  type: TokenTypesUnion;
  player: PlayersUnion;
}

type ColumnIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

interface Move {
  column: ColumnIndex;
  token: Token;
}


type ConnectFourGrid = Token[][]

export class ConnectFourGame  {
  private readonly HEIGHT: number = 6
  private readonly WIDTH: number = 7
  private readonly PLAYER_ONE: PlayerOne = 1
  private readonly PLAYER_TWO: PlayerTwo = 2
  private readonly moveStack: number[] = []
  private __grid: ConnectFourGrid = this.newGrid()
  readonly TOKEN_TYPES: TokenType = {
    STANDARD: 'STANDARD',
  }

  public get grid(): ConnectFourGrid {
    return [...this.__grid]
  }

  public takeTurnPlayer(player: PlayersUnion) {
    return {
      column: (column: ColumnIndex) => ({
        dropToken: {
          standard: () => {
            this.drop({
              column,
              token: {
                player,
                type: this.TOKEN_TYPES.STANDARD,
              }
            })
          }
        }
      })
    }
  }

  // public get takeTurn() {
  //   return {
  //     player: (player: PlayersUnion) => ({
  //       column: (column: ColumnIndex) => ({
  //         dropToken: {
  //           standard: () => {
  //             this.drop({
  //               column,
  //               token: {
  //                 player,
  //                 type: this.TOKEN_TYPES.STANDARD,
  //               }
  //             })
  //           }
  //         }
  //       })
  //     })
  //   }
  // }

  public newGame(): ConnectFourGrid {
    this.__grid = this.newGrid()
    return this.__grid
  }

  private drop({ column, token }: Move): boolean {
    this.moveStack.push(column)
    if (!Array.isArray(this.__grid[column])) {
      throw new Error(`invalid column: ${column}`)
    }
    if (!this.isValidPlayer(token.player)) {
      throw new Error(`invalid player: ${token.player}`)
    }
    if (!this.isValidTokenType(token.type)) {
      throw new Error(`invalid token type: ${token.type}`)
    }
    if (this.__grid[column].length + 1 > this.HEIGHT) {
      throw new Error(`column max length exceeded: ${this.__grid[column].length}`)
    }
    this.__grid[column].push(token)
    // this.resolveTokens()
    return this.isWin()
  }

  private isWin() {
    return false
  }

  private isValidPlayer(n: PlayersUnion): boolean {
    return n === this.PLAYER_ONE || n === this.PLAYER_TWO
  }

  private isValidTokenType(tokenType: TokenTypesUnion): boolean {
    return !!this.TOKEN_TYPES[tokenType]
  }

  private toString() {
    return JSON.stringify(this.__grid, null, 2)
  }

  private newGrid(): ConnectFourGrid {
    const grid = []
    for (let i = 0; i < this.WIDTH; i += 1) {
      grid.push([])
    }
    return grid
  }
}
