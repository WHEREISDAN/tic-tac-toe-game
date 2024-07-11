This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# Tic Tac Toe with AI

This project is a modern implementation of the classic Tic Tac Toe game, built with Next.js and featuring an AI opponent with adjustable difficulty levels.

## Features

- Play Tic Tac Toe against an AI opponent
- Four difficulty levels: Easy, Normal, Hard, and Impossible
- Responsive design that works on desktop and mobile
- Dark theme for comfortable gameplay
- Animated robot opponent that provides feedback

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI Components

## Getting Started

To run this project locally:

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

1. Select the difficulty level from the dropdown menu
2. Click on an empty cell to make your move
3. Try to get three in a row horizontally, vertically, or diagonally
4. The AI will make its move after you
5. The game ends when there's a winner or a draw
6. Click "Reset Game" to start a new game

## AI Difficulty Levels

- Easy: Makes random moves
- Normal: Blocks some winning moves and makes some strategic choices
- Hard: Plays optimally most of the time
- Impossible: Plays perfectly, cannot be beaten

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
