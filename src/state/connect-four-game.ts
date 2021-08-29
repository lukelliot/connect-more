interface TokenType {
  STANDARD: 'STANDARD'
  // BOMB: 'BOMB'
}

type TokenTypesUnion = keyof TokenType

export interface Token {
  type: TokenTypesUnion;
  player: number;
}
interface Move {
  column: number;
  token: Token;
}

type ConnectFourGrid = Token[][]
export class ConnectFourGame  {
  private readonly HEIGHT = 6
  private readonly WIDTH = 7
  private readonly PLAYER_ONE = 1
  private readonly PLAYER_TWO = 2
  private readonly moveStack: number[] = []
  private __grid: ConnectFourGrid = this.newGrid()
  readonly TOKEN_TYPES: TokenType = {
    STANDARD: 'STANDARD',
    // BOMB: 'BOMB',
  }

  public get grid(): ConnectFourGrid {
    return [...this.__grid]
  }

  public get takeTurn() {
    return {
      player: (player: number) => ({
        column: (column: number) => ({
          drop: {
            standardToken: () => {
              return this.drop({
                column,
                token: {
                  player,
                  type: this.TOKEN_TYPES.STANDARD,
                }
              })
            }
            // bombToken: () => {
            //   this.drop({
            //     column,
            //     token: {
            //       player,
            //       type: this.TOKEN_TYPES.BOMB,
            //     }
            //   })
            // }
          }
        })
      })
    }
  }

  public newGame(): ConnectFourGrid {
    this.__grid = this.newGrid()
    return this.grid
  }

  private drop({ column, token }: Move): boolean {
    if (!Array.isArray(this.__grid[column])) {
      return false
    }
    if (!this.isValidPlayer(token.player)) {
      return false
    }
    if (!this.isValidTokenType(token.type)) {
      return false
    }
    if (this.__grid[column].length + 1 > this.HEIGHT) {
      return false
    }

    this.moveStack.push(column)
    this.push(column, token)

    return true
  }
  private n = 0
  public isWin(): boolean {
    // TODO: win logic duh
    if (this.n === 6) {
      this.n = 1
      return true
    }
    this.n += 1
    return false
  }

  private isValidPlayer(n: number): boolean {
    return n === this.PLAYER_ONE || n === this.PLAYER_TWO
  }

  private isValidTokenType(tokenType: TokenTypesUnion): boolean {
    return !!this.TOKEN_TYPES[tokenType]
  }

  private toString(): string {
    return JSON.stringify(this.__grid, null, 2)
  }

  private newGrid(): ConnectFourGrid {
    const grid = []
    for (let i = 0; i < this.WIDTH; i += 1) {
      grid.push([])
    }
    return grid
  }

  private push(column: number, token: Token): void {
    this.__grid[column].push(token)
  }
}

export class ColumnLengthExceededError extends Error {
  public readonly columnIndex: number
  constructor(columnIndex: number) {
    super(`length exceeded maximum at column index ${columnIndex}`)
    this.name = this.constructor.name
    this.columnIndex = columnIndex
    Error.captureStackTrace(this, this.constructor)
  }
}
