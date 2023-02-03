import { opCode4 } from "../opCode4";

const opCode = new opCode4();

describe("Test opCode 4", () => {
  describe("Test Mode 0", () => {
    test("Return if a console.log is fired with the value of the 1st position", async () => {
      const logSpy = jest.spyOn(console, "log");
      await opCode.render([4, 1], [100, 50, 100, 20], 0);
      expect(logSpy).toBeCalledWith("Value : 50");
    });

    test("Throw error because the opCode isn't valid", async () => {
      try {
        await opCode.render([1, 30], [100, 50, 100, 20], 0);
      } catch (e: any) {
        expect(e.message).toBe("Invalid opCode");
      }
    });

    test("Throw error because there are no values", async () => {
      try {
        await opCode.render;
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
      }
    });

    test("Throw error because the number of values isn't valid", async () => {
      try {
        await opCode.render([4, 20, 30], [100, 50, 100, 20], 0);
      } catch (e: any) {
        expect(e.message).toBe("Invalid number of values");
      }
    });
  });

  describe("Test Mode 1", () => {
    test("Return if a console.log is fired with the value of the 1st position", async () => {
      const logSpy = jest.spyOn(console, "log");
      await opCode.render([4, 1], [100, 50, 100, 20], 1);
      expect(logSpy).toBeCalledWith("Value : 50");
    });

    test("Throw error because the opCode isn't valid", async () => {
      try {
        await opCode.render([1, 30], [100, 50, 100, 20], 1);
      } catch (e: any) {
        expect(e.message).toBe("Invalid opCode");
      }
    });

    test("Throw error because there are no values", async () => {
      try {
        await opCode.render;
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
      }
    });

    test("Throw error because the number of values isn't valid", async () => {
      try {
        await opCode.render([4, 20, 30], [100, 50, 100, 20], 1);
      } catch (e: any) {
        expect(e.message).toBe("Invalid number of values");
      }
    });

    test("Throw error because the parameter at saving position is 1 at mode 1", async () => {
      try {
        await opCode.render([104, 1], [100, 50, 100, 20], 1);
      } catch (e: any) {
        expect(e.message).toBe("Invalid parameter 1 at saving position");
      }
    });
  });
});
