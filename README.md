This is the front end of the matching game, built by [Next.js](https://nextjs.org)

### The goal

It aims to make a card matching game with numbers on the card. Players can click the card to see the number and then use the memory to match the card.
It has the player's best score and global best score, which represent the best score across the all players.

### Features

- [x] Play card game
- [x] See my best score
- [x] See my global score
- [x] Global score updates immediately
- [x] Restart game anytime
- [x] Prevent users see the value of the cards using Google Chrome dev tool(e.g. inspect).

### How it works

It checks the 2 open cards and compare the value of them. According to comparasion, it updates the card status.
This is the variable `openCards`.
It uses React states to handle the card status.
(Card has 4 status - `open, hidden, matched and unmatched`. You can see the details of the card status below.).
Cards actions(hide, show) are being done by CSS.

##### Workflow

1. When the player clicks the card, the card index is added to `openCards`.
2. If the length of `openCards` are 2, compare the values of them.
3. If the values are equal, updates the status 2 open cards as `Matched`.
4. If the values are differnet, updates the status 2 open cards as `Unmatched`.
5. When all the cards are `Matched`, the player wins.

##### Card Status

- `Open` The card is open. This is when the player click a hidden card.
- `Hidden` The card is hidden. This is the original status and also when the 2 open cards aren different.
- `Matched` The 2 open cards are equal and they are opened. `Matched` cards are not clickable.
- `Unmatched` When player opens 2 cards and they are different, cards status become `Unmatched`. `Unmatched` status will become `Hidden` automatically after 1 seconds. This status is just to enhance the card animation from `Open` to `Hidden`. `Unmatched` cards are not clickable.

##### Score update

It uses Websocket to received the global best score updates on real-time basis.

### File Structure

It uses [Fractal](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af) structure from React.

##### components

It has the components used in the app.

Compnents are separated by common components and components that are used only on a certain page.

There is 1 common component and 2 components for the game page.

- `IconButton` is the button with icon. Restart Button is the `IconButton`.
- `Card` is a card. It has its `value` and `status` as props.
- `WinModal` is a modal dialog, which shown when the player wins. It uses [React Modal](https://www.npmjs.com/package/react-modal).

##### pages

This directory is created by Nextjs and the files inside in it are treated as routes.

- `index.tsx` has the game board.

##### styles

It has the styles for the app. It uses SCSS.

##### types

It has all types used in the project(interface, type, enum) and constants.

##### services

It has the helper functions (shuffle the card values of 1 - 6) and ajax helper using `axios`.

- `functions.ts` has the seperate functions for the project. e.g. `shuffleCards` to shuffle the card values when starting a new game.
- `axios.ts` has the axios configration and helper functions to make ajax calls. Also it includes the API functions.(e.g. `getBestScore`, `updateBestScore`)

### Running locally

To run on the local, please use the below commands.

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to play the game.

### Unit testing

It uses `jest` and `enzyme` for the unit tesing.
`__test__` folder contains the test script.

To run the test, use the following command.

```bash
npm run test
# or
yarn test
```

### Environment variables

On `.env` file, it has 2 environmental variables.

- `NEXT_PUBLIC_BACKEND_BASE_URL` has the base url of the back end.
- `NEXT_PUBLIC_WEBSOCKET_URL` has the websocket url.

### Deploy

Please check the deploy document.
