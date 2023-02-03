import { opCode2 } from "../opCode2";

const opCode = new opCode2();

describe("Test opCode 2", () => {
  describe("Test Mode 0", () => {
    test("Save the multiplication of position 1, 2 at position 3 and return the modified array", async () => {
      expect(await opCode.render([2, 1, 2, 3], [100, 5, 100, 20], 0)).toStrictEqual([100, 5, 100, 500]);
    });

    test("Throw error because the opCode isn't valid", async () => {
      try {
        await opCode.render([1, 1, 2, 3], [100, 50, 100, 20], 0);
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
        await opCode.render([2, 1, 2, 3, 30], [100, 50, 100, 20], 0);
      } catch (e: any) {
        expect(e.message).toBe("Invalid number of values");
      }
    });
  });

  describe("Test Mode 1", () => {
    test("Save the multiplication of position 1, and value 2 at position 3 and return the modified array", async () => {
      expect(await opCode.render([1002, 1, 2, 3], [100, 5, 100, 20], 1)).toStrictEqual([100, 5, 100, 10]);
    });

    test("Throw error because the opCode isn't valid", async () => {
      try {
        await opCode.render([1003, 1, 2, 3], [100, 50, 100, 20], 1);
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
        await opCode.render([1002, 1, 2, 3, 30], [100, 50, 100, 20], 1);
      } catch (e: any) {
        expect(e.message).toBe("Invalid number of values");
      }
    });

    test("Throw error because the parameter at saving position is 1 at mode 1", async () => {
      try {
        await opCode.render([11102, 1, 2, 3], [100, 50, 100, 20], 1);
      } catch (e: any) {
        expect(e.message).toBe("Invalid parameter 1 at saving position");
      }
    });
  });
});
