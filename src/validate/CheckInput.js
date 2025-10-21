export class CheckInput {
  carName(carList) {
    const IS_VALID = carList.every((car) => {
      return car.length <= 5 && car.length > 0;
    });

    if (IS_VALID === false) {
      throw new Error("[ERROR]");
    }
  }
}