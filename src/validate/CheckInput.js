export class CheckInput {
  carName(carList) {
    const IS_VALID = carList.every((car) => {
      car.length <= 5;
    });

    if (IS_VALID === false) {
      throw new Error("[ERROR]");
    }
  }
}