import { InterpreterFunction, modeType } from "../../interfaces/interpreterFunciton.abstract";

/**
 * @extends {InterpreterFunction}
 */
export class opCode2 extends InterpreterFunction {
  protected numOfValues = 4;

  protected opCode = 2;

  public async render(values: number[], arrayToModify: number[], mode: modeType): Promise<number[]> {
    this.checkErrors(mode, values);

    arrayToModify[values[3]] = this.getValue(mode, 1, arrayToModify, values) * this.getValue(mode, 2, arrayToModify, values);

    return arrayToModify;
  }
}
