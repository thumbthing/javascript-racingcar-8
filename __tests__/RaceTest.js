import { Console, Random } from "@woowacourse/mission-utils";
import { Race } from "../src/race/Race";

const MOCK_RANDOM_NUMBER = (numbers) => {
  Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, Random.pickNumberInRange);
}

const GET_LOG_SPY = () => {
  const LOG_SPY = jest.spyOn(Console, "print");
  LOG_SPY.mockClear();
  return LOG_SPY;
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

  test("필드 값의 기록으로 문자열 생성", () => {
    // given
    const CAR_LIST = ["aaa", "bbb", "ccc", "ddd"];
    const ATTEMPT_COUNT = 1;
    const RANDOM_NUMBER = [0, 4, 3, 5];
    const EXPECTED_RECORD_STRING = `${["aaa : ", "bbb : -", "ccc : ", "ddd : -"].join("\n")}\n`;

    MOCK_RANDOM_NUMBER(RANDOM_NUMBER);

    // when
    const RACE = new Race(CAR_LIST, ATTEMPT_COUNT);
    RACE.updateRecord();
    const RECORD_STRING = RACE.createRecordString();

    // then
    expect(RECORD_STRING).toBe(EXPECTED_RECORD_STRING);
  });

  test("시행 횟수 만큼 생성된 레이스 실행-결과 출력", () => {
    // given
    const CAR_LIST = ["aaa", "bbb", "ccc", "ddd"];
    const ATTEMPT_COUNT = 2;
    const RANDOM_NUMBER = [0, 4, 3, 5, 9, 1, 8, 7];
    const INITIAL_STRING = "\n실행 결과\n"
    const EXPECTED_FIRST_RECORD_STRING = `${["aaa : ", "bbb : -", "ccc : ", "ddd : -"].join("\n")}\n`;
    const EXPECTED_SECOND_RECORD_STRING = `${["aaa : -", "bbb : -", "ccc : -", "ddd : --"].join("\n")}\n`;
    const EXPECTED_RECORD_STRING = [INITIAL_STRING, EXPECTED_FIRST_RECORD_STRING, EXPECTED_SECOND_RECORD_STRING];
    const LOG_SPY = GET_LOG_SPY();

    MOCK_RANDOM_NUMBER(RANDOM_NUMBER);

    // when
    const RACE = new Race(CAR_LIST, ATTEMPT_COUNT);
    RACE.run();

    // then
    EXPECTED_RECORD_STRING.forEach((log) => {
      expect(LOG_SPY).toHaveBeenCalledWith(expect.stringContaining(log))
    })
  });

  test("우승자 목록 생성", () => {
    // given
    const CAR_LIST = ["aaa", "bbb"];
    const ATTEMPT_COUNT = 3;
    const RANDOM_NUMBER = [0, 4, 0, 4, 0, 4];
    const EXPECTED_RESULT = "최종 우승자 : bbb";
    const LOG_SPY = GET_LOG_SPY();

    MOCK_RANDOM_NUMBER(RANDOM_NUMBER);
    // when
    const RACE = new Race(CAR_LIST, ATTEMPT_COUNT);
    RACE.run();

    // then
    expect(LOG_SPY).toHaveBeenLastCalledWith(EXPECTED_RESULT);
  });

  test("여러명의 우승자 목록 생성", () => {
    // given
    const CAR_LIST = ["aaa", "bbb", "ccc", "ddd"];
    const ATTEMPT_COUNT = 3;
    const RANDOM_NUMBER = [4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 0];
    const EXPECTED_RESULT = "최종 우승자 : aaa, bbb, ccc";
    const LOG_SPY = GET_LOG_SPY();

    MOCK_RANDOM_NUMBER(RANDOM_NUMBER);
    // when
    const RACE = new Race(CAR_LIST, ATTEMPT_COUNT);
    RACE.run();

    // then
    expect(LOG_SPY).toHaveBeenLastCalledWith(EXPECTED_RESULT);
  });
});