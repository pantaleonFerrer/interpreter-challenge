import { opCode3 } from "../opCode3";
import mockStdin from "mock-stdin";

const opCode = new opCode3();

describe("Test opCode 3", () => {
  let stdin: ReturnType<typeof mockStdin.stdin>;
  beforeEach(() => {
    stdin = mockStdin.stdin();
  });

  describe("Test Mode 0", () => {
    test("Ask for an input, send it as 50 and set the value in the poistion 1", () => {
      const result = opCode.render([3, 1], [100, 1, 100, 20], 0);
      stdin.send("50");
      stdin.end();
      result.then((x) => {
        expect(x).toStrictEqual([100, 50, 100, 500]);
      });
    });

    test("Throw error because the opCode isn't valid", async () => {
      try {
        await opCode.render([1, 50], [100, 20], 0);
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
        await opCode.render([3, 1, 30], [100, 50, 100, 20], 0);
      } catch (e: any) {
        expect(e.message).toBe("Invalid number of values");
      }
    });
  });

  describe("Test Mode 1", () => {
    test("Ask for an input, send it as 50 and set the value in the poistion 1", () => {
      const result = opCode.render([3, 1], [100, 1, 100, 20], 0);
      stdin.send("50");
      stdin.end();
      result.then((x) => {
        expect(x).toStrictEqual([100, 50, 100, 500]);
      });
    });

    test("Throw error because the opCode isn't valid", async () => {
      try {
        await opCode.render([101, 50], [100, 20], 1);
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
        await opCode.render([103, 1, 30], [100, 50, 100, 20], 1);
      } catch (e: any) {
        expect(e.message).toBe("Invalid number of values");
      }
    });

    test("Throw error because the parameter at saving position is 1 at mode 1", async () => {
      try {
        await opCode.render([103, 1], [100, 50, 100, 20], 1);
      } catch (e: any) {
        expect(e.message).toBe("Invalid parameter 1 at saving position");
      }
    });
  });
});
