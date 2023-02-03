/**
        Prepare an string to be returned as an array
        @param {string} values - The values to prepare
        @return {number[]} - The processed values
    */
export default function prepareValues(values: string): number[] {
  checkTypoErrors(values);

  const valuesToReturn = values.replaceAll(" ", "").split(",");

  checkPreparedValuesErrors(valuesToReturn);

  return valuesToReturn.map(Number);
}

/**
        Check if there is any typoError
        @param {string} values - The values to check
    */
function checkTypoErrors(values: string): void {
  if (typeof values !== "string") {
    throw new Error("Value must be an string");
  }
}

/**
        Check if there is any error with the value to return
        @param {string[]} returnState - The state to return
    */
function checkPreparedValuesErrors(returnState: string[]): void {
  if (!Array.isArray(returnState) && typeof returnState[0] !== "string") {
    throw new Error("The returned state must be an array of strings");
  }

  if (returnState.length < 2) {
    throw new Error("There are needed more values to start");
  }

  returnState.map((x) => {
    if (isNaN(Number(x))) {
      throw new Error("There are a value that isn't numeric");
    }
  });
}
