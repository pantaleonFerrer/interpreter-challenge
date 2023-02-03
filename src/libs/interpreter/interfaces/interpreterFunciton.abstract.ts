import getOpCode from "../utils/opCode";

export abstract class InterpreterFunction {
  /**
        @type {number} - Num of values represents how many posiitions of array it needs to take from the operator
    */
  protected abstract numOfValues: number;

  /**
        @type {number} - Num of the operation code
    */
  protected abstract opCode: number;

  /**
        Render will be the main method to execute the interpreter function
        @param {number[]} values - The array of values of the instruction to be processed
        @param {number[]} arrayToModify - The complete array to process
        @param {modeType} mode - The mode to execute. It can be 1 or 0
        @return {number[]} The result will be the arrayToModify modified by the values instructions
    */

  public abstract render(values: number[], arrayToModify: number[], mode: modeType): Promise<number[]>;

  /**
        It will return the numOfValues of the intruction class to filter the array
        @retunr {number} The number of values that the instruction needs
    */
  public getNumOfValues(): number {
    return this.numOfValues;
  }

  /**
        It will return the opCode of the intruction to diference between the others
        @return {number} The number of instruction
    */
  public getOpCode(): number {
    return this.opCode;
  }

  /**
        It will check if the opCode is valid
        @param {number} opCode - opCode introduced
        @return {number} The number of instruction
    */
  protected checkOpCode(opCode: number) {
    return this.opCode === opCode;
  }

  /**
        It will check all the errors that can have the format
        @param {modeType} mode - Mode of execution
        @param {number[]} values - Array of values that have been introduced
    */
  protected checkErrors(mode: modeType, values: number[]): void {
    if (!this.checkOpCode(getOpCode(values[0]))) {
      throw new Error("Invalid opCode");
    }

    if (values.length > this.numOfValues) {
      throw new Error("Invalid number of values");
    }

    if (mode === 1) {
      const valuesStr = String(values[0]);

      if (valuesStr.length === this.getNumOfValues() + 1 && valuesStr[0] === "1") {
        throw new Error("Invalid parameter 1 at saving position");
      }
    }
  }

  /**
        It will return the desired value considering the mode, position and the logic
        @param {modeType} mode - Mode of execution
        @param {number} position - Position of logic to check
        @param {number[]} arrayToModify - Introduced array to modify
        @param {number[]} modeLogic - Array of values that have the values to do the logic
    */
  protected getValue(mode: modeType, position: number, arrayToModify: number[], modeLogic: number[]): number {
    if (mode === 1) {
      const logic = String(modeLogic[0]).split("").reverse();
      logic.splice(0, 2);

      if (logic[position - 1] === "1") return modeLogic[position];

      return arrayToModify[modeLogic[position]];
    }

    return arrayToModify[modeLogic[position]];
  }
}

export type modeType = 1 | 0;
