/**
        Get the opCode depending on the value of code
        @param {number} value - The values to check
        @return {numbner} - The opCode of the value
    */
export default function getOpCode(value: number): number {
  if (value > 100) {
    const toStr = String(value);
    return Number(toStr[toStr.length - 1]);
  }
  return value;
}
