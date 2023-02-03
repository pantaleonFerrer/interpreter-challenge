import { InterpreterFunction, modeType } from "./interfaces/interpreterFunciton.abstract";
import prepareValues from "./utils/valuesParser";
import opCodes from "./classes/opcodes";
import getOpCode from "./utils/opCode";

export class Interpreter {
  /**
        @type {{ [x: number]: number }} - Object that contains the strategies to filter easily. The key of the object is the opCode number 
    */
  private strategySelector: { [x: number]: InterpreterFunction } = {};

  /**
        @constructor - Initialize all the strategies imported and push it into the strategies var. Also it adds to the strategy selector the position of known opCodes
    */
  constructor() {
    console.log("Loading interpreter operations...");
    for (const Strategy of opCodes) {
      const strategyInstance = new Strategy();
      this.strategySelector[strategyInstance.getOpCode()] = strategyInstance;
    }
    console.log("Interpreter loaded");
  }

  /**
        Init will be the main method to execute the interpreter. Init method prepare all the values from an string and convert it to Number. After that it will execute the main loop of the interpreter.
        @param {string} values - The string of values to process
        @return {string} The result of process the values
    */
  public async init(values: string): Promise<string> {
    let arrayToProcess: number[] = prepareValues(values);

    return await this.mainLoop(arrayToProcess);
  }

  /**
        Main loop will start a loop that will end when the interpreter finds the 99 value on it.
        @param {number[]} arrayToProcess - The array of numbers that will be processed using the interpreter functions
        @return {string} The result of process the values
    */
  private async mainLoop(arrayToProcess: number[]): Promise<string> {
    let i = 0;

    while (i < arrayToProcess.length && arrayToProcess[i] !== 99) {
      const strategy = this.strategySelector[getOpCode(arrayToProcess[i])];

      if (!strategy) {
        throw `There was an opcode that doesn't exist in position ${i}. Last result: ${arrayToProcess}`;
      }

      const instructions = arrayToProcess.slice(i, strategy.getNumOfValues() + i);

      const [returnedArray, iterationNumber] = await this.executeStrategy(strategy, arrayToProcess, instructions);

      arrayToProcess = returnedArray;

      i += iterationNumber;
    }
    return arrayToProcess.join(",");
  }

  /**
        Execute strategy will get the selected strategy and will execute it using the array to be interpreted
        @param {InterpreterFunction} strategy - The selected strategy
        @param {number[]} arrayToProcess - The array of numbers to execute the strategy
        @param {number[]} instructions - The instructions to operate the strategy
        @return {Promise<[number[], number]>} The result of process the values. The first position of the array will be the new array to interpret. The second position is the number of values that strategy needed
    */
  private async executeStrategy(strategy: InterpreterFunction, arrayToProcess: number[], instructions: number[]): Promise<[number[], number]> {
    return [await strategy.render(instructions, arrayToProcess, instructions[0] > 100 ? 1 : (0 as modeType)), strategy.getNumOfValues()];
  }
}
