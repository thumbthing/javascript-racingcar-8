import { Random } from "@woowacourse/mission-utils";

export class Race {

  constructor(carList, attemptCount) {
    this.carList = carList;
    this.attemptCount = attemptCount;
  }
  
  getCondition() {
    const RANDOM_NUMBER = Random.pickNumberInRange(0, 9);
    const IS_OVER_FOUR = RANDOM_NUMBER >= 4;
    return IS_OVER_FOUR;
  }
}