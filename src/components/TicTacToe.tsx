'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import RobotSVG from './RobotSVG';

// ... (types remain the same)

const TicTacToe: React.FC = () => {
  // ... (state and logic functions remain the same)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-4xl p-6 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Tic Tac Toe</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
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
          <div className="text-xl font-semibold text-purple-600">{status}</div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          <Card className="p-4 bg-white shadow-md">
            <div className="grid grid-cols-3 gap-2">
              {board.map((value, index) => (
                <Button
                  key={index}
                  onClick={() => handleMove(index)}
                  className={`w-20 h-20 text-2xl font-bold transition-all duration-300 ${
                    value ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  disabled={!!value || !!winner || currentPlayer === 'O'}
                >
                  {value}
                </Button>
              ))}
            </div>
          </Card>
          
          <div className="flex flex-col items-center">
            <div className="w-40 h-40">
              <RobotSVG />
            </div>
            {robotMessage && (
              <Card className="mt-4 bg-blue-100 max-w-xs">
                <CardContent className="p-4">
                  <p className="text-sm text-blue-800">{robotMessage}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button 
            onClick={() => {
              setBoard(Array(9).fill(null));
              setCurrentPlayer('X');
              setRobotMessage('');
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Reset Game
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TicTacToe;