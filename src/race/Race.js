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
    const randomNumber = Random.pickNumberInRange(0, 9);
    const isOverFour = randomNumber >= 4;
    return isOverFour;
  }

  // 레이스 기록 최신화
  updateRecord() {
    this.carList.forEach((car) => {
      const isOverFour = this.getCondition();
      if (isOverFour) {
        const updatedPosition = this.raceRecord.get(car) + "-"
        this.raceRecord.set(car, updatedPosition);
      } 
    })
  }

  // 결과 문자열 생성
  createRecordString() {
    const record = this.carList.map((car) => {
      return `${car} : ${this.raceRecord.get(car)}`
    })
    const recordString = `${record.join('\n')}\n`;
    return recordString;
  }

  // 우승자 위치 반환
  getWinnerPosition() {
    const recordPosition = [...this.raceRecord.values()].map((record) => record.length);
    const winnerPosition = Math.max(...recordPosition);
    return winnerPosition;
  }

  // 우승자 명단 생성
  getWinnerList(winnerPosition) {
    const winner = [];
    this.carList.forEach((car) => {
      const record = this.raceRecord.get(car);
      if (record.length === winnerPosition) winner.push(car);
    });
    return winner;
  }

  // 우승자 선별
  getWinner() {
    const winnerPosition = this.getWinnerPosition();
    const winner = this.getWinnerList(winnerPosition);
    const resultString = `최종 우승자 : ${winner.join(', ')}`;
    Console.print(resultString);
  }

  // 시도할 횟수 만큼 반복
  run() {
    Console.print("\n실행 결과\n");

    for (let count = 0; count < this.attemptCount; count++) {
      this.updateRecord()
      const recordString = this.createRecordString();
      Console.print(recordString);
    }

    this.getWinner();
  }
}