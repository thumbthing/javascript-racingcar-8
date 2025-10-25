export class CheckInput {

  carList(carList) {
    const isLessThenTwoCar = carList.length < 2;
    const isCarNameTooLong = carList.some((car) => {
      return car.length >= 6 || car.length === 0;
    });
    const isNotUniqueCarName = carList.length > new Set(carList).size;
    const isInValid = isLessThenTwoCar || isCarNameTooLong || isNotUniqueCarName;

    if (isInValid) {
      throw new Error("[ERROR]");
    }
  }

  attemptCount(attemptCount) {
    const isNotNumber = Number.isNaN(attemptCount);
    const isTooSmall = attemptCount <= 0;
    const isDicimal = Math.floor(attemptCount) !== attemptCount || Math.ceil(attemptCount) !== attemptCount;

    if (isNotNumber || isTooSmall || isDicimal) {
      throw new Error("[ERROR]");
    }
  }
}