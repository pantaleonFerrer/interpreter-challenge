import input from "../../../../utils/readline";
import { InterpreterFunction, modeType } from "../../interfaces/interpreterFunciton.abstract";

/**
 * @extends {InterpreterFunction}
 */
export class opCode3 extends InterpreterFunction {
  protected numOfValues = 2;

  protected opCode = 3;

  public async render(values: number[], arrayToModify: number[], mode: modeType): Promise<number[]> {
    this.checkErrors(mode, values);
    
    const valuetoInsert = await input(`Input a value to store in position ${values[1]}: `);

    arrayToModify[values[1]] = Number(valuetoInsert);

    return arrayToModify;
  }
}
