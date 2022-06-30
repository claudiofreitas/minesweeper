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
  - flag
  - question
  - disclosed/exposed
  - exploded
- land
  - covered
  - flag
  - question
  - discovered: reveals how many mines are around, empty if 0

## Memos

- Interaction with the board does not need to necessarily be with a button that knows exactly the state.
- Pressing the button can just send a signal to the game.
- The game will decide what to do with that signal.
- The visual of the tile can also be decided by the game as well.
