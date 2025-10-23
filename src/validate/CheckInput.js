export class CheckInput {
  carName(carList) {
    const IS_VALID_LENGTH = carList.length > 1;
    const IS_VALID_CAR_NAME = carList.every((car) => {
      return car.length <= 5 && car.length > 0;
    });
    const IS_UNIQUE_CAR_NAME = carList.length === new Set(carList).size;
    const IS_VALID = IS_VALID_LENGTH && IS_VALID_CAR_NAME && IS_UNIQUE_CAR_NAME;

    if (IS_VALID === false) {
      throw new Error("[ERROR]");
    }
  }

  attemptCount(attemptCount) {
    const IS_NaN = Number.isNaN(attemptCount);
    const IS_TOO_SMALL = attemptCount <= 0;
    const IS_DICIMAL = Math.floor(attemptCount) !== attemptCount || Math.ceil(attemptCount) !== attemptCount;

    if (IS_NaN || IS_TOO_SMALL || IS_DICIMAL) {
      throw new Error("[ERROR]");
    }
  }
}