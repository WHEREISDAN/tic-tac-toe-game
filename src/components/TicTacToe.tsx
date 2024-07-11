'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RobotSVG from './RobotSVG';

// Define types
type Player = 'X' | 'O' | null;
type BoardState = Player[];
type Difficulty = 'easy' | 'normal' | 'hard' | 'impossible';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [robotMessage, setRobotMessage] = useState<string>('');

  useEffect(() => {
    if (currentPlayer === 'O' && !calculateWinner(board) && !isBoardFull(board)) {
      const timer = setTimeout(() => makeAIMove(), 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, board]);

  const handleMove = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer('O');
  };

  const makeAIMove = () => {
    let move: number;
    switch (difficulty) {
      case 'easy':
        move = makeEasyMove();
        setRobotMessage("Beep boop! I made a move!");
        break;
      case 'normal':
        move = makeNormalMove();
        setRobotMessage("I'm getting warmed up!");
        break;
      case 'hard':
        move = makeHardMove();
        setRobotMessage("You can't beat my algorithms!");
        break;
      case 'impossible':
        move = makeImpossibleMove();
        setRobotMessage("Resistance is futile, human!");
        break;
      default:
        move = makeEasyMove();
        setRobotMessage("Beep boop! I made a move!");
    }

    const newBoard = [...board];
    newBoard[move] = 'O';
    setBoard(newBoard);
    setCurrentPlayer('X');
  };

  // Easy AI: Make a random move
  const makeEasyMove = (): number => {
    const availableMoves = board.reduce((acc, cell, index) => 
      cell === null ? [...acc, index] : acc, [] as number[]);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  // Normal AI: Block winning moves and make somewhat strategic choices, with occasional mistakes
  const makeNormalMove = (): number => {
    // Introduce a chance for a mistake (30% chance)
    if (Math.random() < 0.3) {
      return makeEasyMove();
    }

    // Check for winning move
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = 'O';
        if (calculateWinner(testBoard) === 'O') return i;
      }
    }

    // Block player's winning move (80% chance)
    if (Math.random() < 0.8) {
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          const testBoard = [...board];
          testBoard[i] = 'X';
          if (calculateWinner(testBoard) === 'X') return i;
        }
      }
    }

    // Try to take center (70% chance)
    if (board[4] === null && Math.random() < 0.7) return 4;

    // Try to take corners (60% chance)
    if (Math.random() < 0.6) {
      const corners = [0, 2, 6, 8];
      const availableCorners = corners.filter(i => board[i] === null);
      if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
      }
    }

    // Take any available space
    return makeEasyMove();
  };

  // Hard AI: Minimax algorithm without depth limitation
  const makeHardMove = (): number => {
    return minimax(board, 'O').index;
  };

  // Impossible AI: Minimax with alpha-beta pruning
  const makeImpossibleMove = (): number => {
    return minimaxAlphaBeta(board, 'O', -Infinity, Infinity).index;
  };

  // Minimax algorithm
  const minimax = (board: BoardState, player: 'X' | 'O'): { score: number; index: number } => {
    const availableMoves = board.reduce((acc, cell, index) => 
      cell === null ? [...acc, index] : acc, [] as number[]);

    if (calculateWinner(board) === 'X') return { score: -10, index: -1 };
    if (calculateWinner(board) === 'O') return { score: 10, index: -1 };
    if (availableMoves.length === 0) return { score: 0, index: -1 };

    const moves = availableMoves.map(index => {
      const newBoard = [...board];
      newBoard[index] = player;
      const score = minimax(newBoard, player === 'X' ? 'O' : 'X').score;
      return { score, index };
    });

    return player === 'O'
      ? moves.reduce((best, move) => move.score > best.score ? move : best)
      : moves.reduce((best, move) => move.score < best.score ? move : best);
  };

  // Minimax with alpha-beta pruning
  const minimaxAlphaBeta = (
    board: BoardState,
    player: 'X' | 'O',
    alpha: number,
    beta: number
  ): { score: number; index: number } => {
    const availableMoves = board.reduce((acc, cell, index) => 
      cell === null ? [...acc, index] : acc, [] as number[]);

    if (calculateWinner(board) === 'X') return { score: -10, index: -1 };
    if (calculateWinner(board) === 'O') return { score: 10, index: -1 };
    if (availableMoves.length === 0) return { score: 0, index: -1 };

    let bestMove = { score: player === 'O' ? -Infinity : Infinity, index: -1 };

    for (let i = 0; i < availableMoves.length; i++) {
      const index = availableMoves[i];
      const newBoard = [...board];
      newBoard[index] = player;
      const score = minimaxAlphaBeta(newBoard, player === 'X' ? 'O' : 'X', alpha, beta).score;

      if (player === 'O') {
        if (score > bestMove.score) bestMove = { score, index };
        alpha = Math.max(alpha, score);
      } else {
        if (score < bestMove.score) bestMove = { score, index };
        beta = Math.min(beta, score);
      }

      if (beta <= alpha) break;
    }

    return bestMove;
  };

  const calculateWinner = (squares: BoardState): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const isBoardFull = (squares: BoardState): boolean => {
    return squares.every(Boolean);
  };

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value as Difficulty);
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull(board)
    ? "It's a draw!"
    : `Next player: ${currentPlayer}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Tic Tac Toe</h1>
      
      <div className="mb-6">
        <Select onValueChange={handleDifficultyChange} defaultValue={difficulty}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
            <SelectItem value="impossible">Impossible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4 text-xl font-semibold">{status}</div>
      
      <div className="flex items-start justify-center space-x-8">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {board.map((value, index) => (
            <Button
              key={index}
              onClick={() => handleMove(index)}
              className="w-20 h-20 text-2xl font-bold"
              variant={value ? 'default' : 'outline'}
              disabled={!!value || !!winner || currentPlayer === 'O'}
            >
              {value}
            </Button>
          ))}
        </div>
        
        <div className="flex flex-col items-center">
          <RobotSVG />
          {robotMessage && (
            <div className="mt-4 p-2 bg-blue-100 rounded-lg max-w-xs">
              <p className="text-sm text-blue-800">{robotMessage}</p>
            </div>
          )}
        </div>
      </div>

      <Button 
        onClick={() => {
          setBoard(Array(9).fill(null));
          setCurrentPlayer('X');
          setRobotMessage('');
        }}
        className="mt-4"
      >
        Reset Game
      </Button>
    </div>
  );
};

export default TicTacToe;
