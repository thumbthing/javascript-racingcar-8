import { Console, Random } from "@woowacourse/mission-utils";
import { Race } from "../src/race/Race";

const mockRandomNumber = (numbers) => {
  Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, Random.pickNumberInRange);
}

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, "print");
  logSpy.mockClear();
  return logSpy;
}

describe("레이스", () => {
  test("전진 조건의 boolean 값 생성", () => {
    // given
    const carList = ["aaa", "bbb", "ccc", "ddd"];
    const attemptCount = 1;
    const randomNumber = [0, 4, 3, 5];
    const expectedResult = [false, true, false, true];

    mockRandomNumber(randomNumber);

    // when
    const race = new Race(carList, attemptCount);

    // then
    expectedResult.forEach((result) => {
      expect(race.getCondition()).toBe(result);
    });
  });

  test("생성된 boolean 값으로 레이스 결과 최신화", () => {
    // given
    const carList = ["aaa", "bbb", "ccc", "ddd"];
    const attemptCount = 1;
    const randomNumber = [0, 4, 3, 5];
    const expectedRaceRecord = new Map([
      ["aaa",""],
      ["bbb","-"],
      ["ccc",""],
      ["ddd","-"]
    ])

    mockRandomNumber(randomNumber);

    // when
    const race = new Race(carList, attemptCount);
    race.updateRecord();
    const raceRecord = race.raceRecord;

    // then
    carList.forEach((car) => {
      expect(raceRecord.get(car)).toBe(expectedRaceRecord.get(car));
    });
  });

  test("필드 값의 기록으로 문자열 생성", () => {
    // given
    const carList = ["aaa", "bbb", "ccc", "ddd"];
    const attemptCount = 1;
    const randomNumber = [0, 4, 3, 5];
    const expectedRecordString = `${["aaa : ", "bbb : -", "ccc : ", "ddd : -"].join("\n")}\n`;

    mockRandomNumber(randomNumber);

    // when
    const race = new Race(carList, attemptCount);
    race.updateRecord();
    const recordString = race.createRecordString();

    // then
    expect(recordString).toBe(expectedRecordString);
  });

  test("시행 횟수 만큼 생성된 레이스 실행-결과 출력", () => {
    // given
    const carList = ["aaa", "bbb", "ccc", "ddd"];
    const attemptCount = 2;
    const randomNumber = [0, 4, 3, 5, 9, 1, 8, 7];
    const initialString = "\n실행 결과\n"
    const expectedFirstRecordString = `${["aaa : ", "bbb : -", "ccc : ", "ddd : -"].join("\n")}\n`;
    const expectedSecondRecordString = `${["aaa : -", "bbb : -", "ccc : -", "ddd : --"].join("\n")}\n`;
    const expectedRecordString = [initialString, expectedFirstRecordString, expectedSecondRecordString];
    const logSpy = getLogSpy();

    mockRandomNumber(randomNumber);

    // when
    const race = new Race(carList, attemptCount);
    race.run();

    // then
    expectedRecordString.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log))
    })
  });

  test("우승자 선별할 최대 진행 횟수, 우승자 1명 반환-시도횟수 1회, 중복 우승자 존재 x", () => {
    // given
    const carList = ["aaa", "bbb"];
    const attemptCount = 1;
    const randomNumber = [3, 4];
    const expectedPosition = 1;
    const expectedWinner = ["bbb"];

    mockRandomNumber(randomNumber);
    // when
    const race = new Race(carList, attemptCount);
    race.updateRecord();
    const maxRecord = race.getWinnerPosition();
    const winner = race.getWinnerList(maxRecord);

    // then
    expect(maxRecord).toBe(expectedPosition);
    expect(winner.length).toBe(1);
    expect(winner).toEqual(expect.arrayContaining(expectedWinner))
    expect(winner[0]).toBe(expectedWinner[0]);
  });

  test("우승자 선별할 최대 진행 횟수, 다수의 우승자 반환-시도횟수 3회, 중복 우승자 존재 o", () => {
    // given
    const carList = ["aaa", "bbb", "ccc"];
    const attemptCount = 3;
    const randomNumber = [3, 4, 3, 4, 4, 3, 4, 3, 4];
    const expectedPosition = 2;
    const expectedWinner = ["aaa", "bbb"];

    mockRandomNumber(randomNumber);
    // when
    const race = new Race(carList, attemptCount);
    for (let i = 0; i < attemptCount; i++) {
      race.updateRecord();
    }
    const maxRecord = race.getWinnerPosition();
    const winner = race.getWinnerList(maxRecord);

    // then
    expect(race.getWinnerPosition()).toBe(expectedPosition);
    expect(winner.length).toBe(2);
    expect(winner).toEqual(expect.arrayContaining(expectedWinner))
    expect(winner[0]).toBe(expectedWinner[0]);
    expect(winner[1]).toBe(expectedWinner[1]);
  });

  test("우승자 목록 생성", () => {
    // given
    const carList = ["aaa", "bbb"];
    const attemptCount = 3;
    const randomNumber = [0, 4, 0, 4, 0, 4];
    const expectedResult = "최종 우승자 : bbb";
    const logSpy = getLogSpy();

    mockRandomNumber(randomNumber);
    // when
    const race = new Race(carList, attemptCount);
    race.run();

    // then
    expect(logSpy).toHaveBeenLastCalledWith(expectedResult);
  });

  test("여러명의 우승자 목록 생성", () => {
    // given
    const carList = ["aaa", "bbb", "ccc", "ddd"];
    const attemptCount = 3;
    const randomNumber = [4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 0];
    const expectedResult = "최종 우승자 : aaa, bbb, ccc";
    const logSpy = getLogSpy();

    mockRandomNumber(randomNumber);
    // when
    const race = new Race(carList, attemptCount);
    race.run();

    // then
    expect(logSpy).toHaveBeenLastCalledWith(expectedResult);
  });
});