export class CheckInput {
  carList(carList) {
    const isValidLength = carList.length > 1;
    const isValidCarName = carList.every((car) => {
      return car.length <= 5 && car.length > 0;
    });
    const isUniqueCarName = carList.length === new Set(carList).size;
    const isValid = isValidLength && isValidCarName && isUniqueCarName;

    if (isValid === false) {
      throw new Error("[ERROR]");
    }
  }

  attemptCount(attemptCount) {
    const isNaN = Number.isNaN(attemptCount);
    const isTooSmall = attemptCount <= 0;
    const isDicimal = Math.floor(attemptCount) !== attemptCount || Math.ceil(attemptCount) !== attemptCount;

    if (isNaN || isTooSmall || isDicimal) {
      throw new Error("[ERROR]");
    }
  }
}