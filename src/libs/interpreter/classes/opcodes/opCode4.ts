import { InterpreterFunction, modeType } from "../../interfaces/interpreterFunciton.abstract";

/**
 * @extends {InterpreterFunction}
 */
export class opCode4 extends InterpreterFunction {
  protected numOfValues = 2;

  protected opCode = 4;

  public async render(values: number[], arrayToModify: number[], mode: modeType): Promise<number[]> {
    this.checkErrors(mode, values);

    console.log(`Value : ${this.getValue(mode, 1, arrayToModify, values)}`);

    return arrayToModify;
  }
}
