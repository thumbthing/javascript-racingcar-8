import { Console } from "@woowacourse/mission-utils";

const INPUT_ERROR = {
  "lessThenTwoCar" : "레이스할 자동차가 부족합니다. 최소 2대 이상 입력해주세요",
  "inCorrectLength": "입력하신 자동차의 이름중에 5자를 초과 또는 비어있습니다. 5자 이하의 자동차 이름을 입력해주세요",
  "notUniqueCarName": "중복된 자동차 이름이 존재합니다",
  "notNumber": "시도하실 횟수가 숫자가 아닙니다. 숫자를 입력해주세요",
  "tooSmall": "시도하실 횟수가 0 이하입니다. 1 이상의 숫자를 입력해주세요",
  "decimal": "시도하실 횟수가 소수입니다. 양의 정수를 입력해주세요"
}

export class CheckInput {
  errorStatus = new Map([
    ["lessThenTwoCar",false],
    ["inCorrectLength",false],
    ["notUniqueCarName",false],
    ["notNumber",false],
    ["tooSmall",false],
    ["decimal",false],
  ])

  intializeStatus() {
    const errorKey = [...this.errorStatus.keys()]
    errorKey.forEach((errorName) => this.errorStatus.set(errorName, false));
  }

  updateErrorStatusByCarList(carList) {
    if (carList.length < 2) this.errorStatus.set("lessThenTwoCar", true);
    if (carList.some((car) => { return car.length >= 6 || car.length <= 0})) this.errorStatus.set("inCorrectLength", true);
    if (carList.length > new Set(carList).size) this.errorStatus.set("notUniqueCarName", true);
  }

  updateErrorStatusByAttempt(attemptCount) {
    if (Number.isNaN(attemptCount)) this.errorStatus.set("notNumber", true);
    if (attemptCount <= 0) this.errorStatus.set("tooSmall", true);
    if (Math.floor(attemptCount) !== attemptCount || Math.ceil(attemptCount) !== attemptCount) this.errorStatus.set("decimal", true);
  }

  carList(carList) {
    const errorKey = [...this.errorStatus.keys()];
    this.updateErrorStatusByCarList(carList);

    [...this.errorStatus.values()].some((errorStatus, index) => {
      if (errorStatus) {
        Console.print(INPUT_ERROR[errorKey[index]]);
        this.intializeStatus();
        throw new Error("[ERROR]");
      }
    })
  }

  attemptCount(attemptCount) {
    const errorKey = [...this.errorStatus.keys()];
    this.updateErrorStatusByAttempt(attemptCount);

    [...this.errorStatus.values()].some((errorStatus, index) => {
      if (errorStatus) {
        Console.print(INPUT_ERROR[errorKey[index]]);
        this.intializeStatus();
        throw new Error("[ERROR]");
      }
    })
  }
}