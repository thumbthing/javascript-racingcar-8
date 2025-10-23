export class CheckInput {
  carName(carList) {
    const IS_VALID = carList.every((car) => {
      return car.length <= 5 && car.length > 0;
    });

    if (IS_VALID === false) {
      throw new Error("[ERROR]");
    }
  }

  attemptCount(attemptCount) {
    const IS_NaN = Number.isNaN(attemptCount);
    const IS_TOO_SMALL = attemptCount <= 0;
    const IS_DICIMAL = Number.isInteger(attemptCount);

    if (IS_NaN || IS_TOO_SMALL || IS_DICIMAL) {
      throw new Error("[ERROR]");
    }
  }
}