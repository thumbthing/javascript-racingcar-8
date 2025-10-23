import { Console, Random } from "@woowacourse/mission-utils";

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

  // 결과 문자열 생성
  createRecordString() {
    const RECORD = this.carList.map((car) => {
      return `${car} : ${this.raceRecord.get(car)}`
    })
    const RECORD_STRING = `${RECORD.join('\n')}\n`;
    return RECORD_STRING;
  }

  // 시도할 횟수 만큼 반복
  run() {
    Console.print("\n실행 결과\n");

    for (let count = 0; count < this.attemptCount; count++) {
      this.updateRecord()
      const RECORD_STRING = this.createRecordString();
      Console.print(RECORD_STRING);
    }
  }
}