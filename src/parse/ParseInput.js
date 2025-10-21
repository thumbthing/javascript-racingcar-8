export class ParseInput {
  getCarList(input) {
    const CAR_LIST = input.split(',');
    return CAR_LIST;
  }

  getAttempts(input) {
    const ATTEMPT_COUNT = Number(input);
    return ATTEMPT_COUNT;
  }
}