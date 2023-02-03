import { Interpreter } from "..";

const interpreter = new Interpreter();

describe("Test interpreter", () => {
  test("Start interpreter with a valid value and expect a valid return", async () => {
    expect(await interpreter.init("1,0,0,0,99")).toStrictEqual("2,0,0,0,99");
  });

  test("Start interpreter with an invalid typo value and expect and error", async () => {
    try {
      await interpreter.init(1 as any);
    } catch (e: any) {
      expect(e.message).toBe("Value must be an string");
    }
  });

  test("Start interpreter with only 1 value and expect and error", async () => {
    try {
      await interpreter.init("1");
    } catch (e: any) {
      expect(e.message).toBe("There are needed more values to start");
    }
  });

  test("Start interpreter with an invalid value (It has a letter) and expect an error ", async () => {
    try {
      await interpreter.init("a,1,2,4,C");
    } catch (e: any) {
      expect(e.message).toBe("There are a value that isn't numeric");
    }
  });
});
