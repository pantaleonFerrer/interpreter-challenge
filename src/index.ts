import { Interpreter } from "./libs/interpreter";
import input from "./utils/readline";

async function init() {
  const interpreter = new Interpreter();

  for (;;) {
    try {
        
    const values = await input("Input some values for the interpreter: ");

      console.log(`Value: ${await interpreter.init(values)}`);
    } catch (e) {
      console.log(e);
    }
  }
}

init();
