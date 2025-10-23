import { Random } from "@woowacourse/mission-utils";
import { Race } from "../src/race/Race";

const MOCK_RANDOM_NUMBER = (numbers) => {
  Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, Random.pickNumberInRange);
}

describe("레이스", () => {
  test("전진 조건의 boolean 값 생성", () => {
    // given
    const CAR_LIST = ["aaa", "bbb", "ccc", "ddd"];
    const ATTEMPT_COUNT = 1;
    const RANDOM_NUMBER = [0, 4, 3, 5];
    const EXPECTED_RESULT = [false, true, false, true];

    MOCK_RANDOM_NUMBER(RANDOM_NUMBER);

    // when
    const RACE = new Race(CAR_LIST, ATTEMPT_COUNT);

    // then
    EXPECTED_RESULT.forEach((result) => {
      expect(RACE.getCondition()).toBe(result);
    });
  });

  test("생성된 boolean 값으로 레이스 결과 최신화", () => {
    // given
    const CAR_LIST = ["aaa", "bbb", "ccc", "ddd"];
    const ATTEMPT_COUNT = 1;
    const RANDOM_NUMBER = [0, 4, 3, 5];
    const EXPECTED_RACE_RECORD = new Map([
      ["aaa",""],
      ["bbb","-"],
      ["ccc",""],
      ["ddd","-"]
    ])

    MOCK_RANDOM_NUMBER(RANDOM_NUMBER);

    // when
    const RACE = new Race(CAR_LIST, ATTEMPT_COUNT);
    RACE.updateRecord();
    const RACE_RECORD = RACE.raceRecord;

    // then
    CAR_LIST.forEach((car) => {
      expect(RACE_RECORD.get(car)).toBe(EXPECTED_RACE_RECORD.get(car));
    });
  });
});