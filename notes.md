# Notes

## Ways to interact with the game

- click tile
- click "smiley"

## Tile types:

- bomb
- land

## State per tile:

- bomb
  - covered
  - flagged
  - questioned
  - discovered
  - exploded
- land
  - covered
  - flagged
  - questioned
  - discovered: reveals how many mines are around, empty if 0

## Game status:

- in progress
- won
- lost

## Memos

- Interaction with the board does not need to necessarily be with a button that knows exactly the state.
- Pressing the button can just send a signal to the game.
- The game will decide what to do with that signal.
- The visual of the tile can also be decided by the game as well.
- Bg: #151617
- Frame: #111213
- Tile: #191A1C
- Outline: #994D20
- Header: #1A1A1C
- Text: #C5C3C1
