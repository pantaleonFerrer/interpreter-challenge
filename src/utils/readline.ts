import readline from "readline";

/**
 * Creates a new readline interface to get data from users at node console
 * @param {string} question - Text to show to wait for response 
 * @returns {Promise<string>} - Text introduced by the user
 */
export default async function input(question: string):Promise<string> {

    return await (new Promise((resolve, reject) => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(question, (answer: string) => {
        resolve(answer);
        rl.close();
      });

    }));
}