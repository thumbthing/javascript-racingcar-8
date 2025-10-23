import { Random } from "@woowacourse/mission-utils";

export class Race {

  constructor(carList, attemptCount) {
    this.carList = carList;
    this.attemptCount = attemptCount;
    this.raceRecord = new Map(carList.map((car) => {
      return [car, ""];
    }));
  }

  // 전진 조건 생성
  getCondition() {
    const RANDOM_NUMBER = Random.pickNumberInRange(0, 9);
    const IS_OVER_FOUR = RANDOM_NUMBER >= 4;
    return IS_OVER_FOUR;
  }

  // 레이스 기록 최신화
  updateRecord() {
    this.carList.forEach((car) => {
      const CONDITION = this.getCondition();
      if (CONDITION) {
        const UPDATED_POSITION = this.raceRecord.get(car) + "-"
        this.raceRecord.set(car, UPDATED_POSITION);
      } 
    })
  }
}