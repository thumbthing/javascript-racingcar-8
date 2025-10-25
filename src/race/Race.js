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

  // 우승자 위치 반환
  getWinnerPosition() {
    const RECORD_POSITION = [...this.raceRecord.values()].map((record) => record.length);
    const WINNER_RECORD = Math.max(...RECORD_POSITION);
    return WINNER_RECORD;
  }

  // 우승자 선별
  getWinner() {
    const MAX_RECORD = this.getWinnerPosition();
    const WINNER = [];
    this.carList.forEach((car) => {
      const RECORD = this.raceRecord.get(car);
      if (RECORD.length === MAX_RECORD) {
        WINNER.push(car);
      }
    });
    const RESULT_STRING = `최종 우승자 : ${WINNER.join(', ')}`;
    Console.print(RESULT_STRING);
  }

  // 시도할 횟수 만큼 반복
  run() {
    Console.print("\n실행 결과\n");

    for (let count = 0; count < this.attemptCount; count++) {
      this.updateRecord()
      const RECORD_STRING = this.createRecordString();
      Console.print(RECORD_STRING);
    }

    this.getWinner();
  }
}