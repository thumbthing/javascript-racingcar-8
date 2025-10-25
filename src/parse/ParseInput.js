export class ParseInput {
  parseCarList(input) {
    const carList = input.split(',');
    return carList;
  }

  parseAttempts(input) {
    const attemptCount = Number(input);
    return attemptCount;
  }
}