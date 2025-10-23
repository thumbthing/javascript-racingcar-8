import { CheckInput } from "../src/validate/CheckInput";

describe("유효성", () => {
  test.each([
    [""],
    ["one"],
  ])("빈값, 2개 미만의 자동차 이름 입력시 error 발생", (...input) => {
    // given
    const TOO_LESS_CAR = input;

    // when
    const CHECK_INPUT = new CheckInput();

    // then
    expect(() => CHECK_INPUT.carName(TOO_LESS_CAR)).toThrow("[ERROR]");
  });

  test.each([
    ["aaa", "bb", "c"],
    ["ccccc", "ddddd", "eeeee", "fffff", "ggggg"]
  ])("2개 이상의 자동차 이름 입력시 유효성 검사 통과", (...input) => {
    // given
    const VALID_CAR_LIST = input;

    // when
    const CHECK_INPUT = new CheckInput();

    // then
    expect(() => CHECK_INPUT.carName(VALID_CAR_LIST)).not.toThrow("[ERROR[");
  });

  test.each([
    ["aaa", "aaa"],
    ["a", "b", "c", "d", "b"]
  ])("중복된 자동차 이름 존재 시 error 발생", (...input) => {
    // given
    const DUPLICATE_CAR_NAME = input;

    // when
    const CHECK_INPUT = new CheckInput();

    // then
    expect(() => CHECK_INPUT.carName(DUPLICATE_CAR_NAME)).toThrow("[ERROR]");
  })

  test("변환된 자동차 목록이 5글자를 초과할 경우 error를 발생", async () => {
    // given
    const TOO_LONG_NAME = ["aaaa", "bbb", "c", "dddddd"];
    
    // when
    const CHECK_INPUT = new CheckInput();

    // then
    expect(() => CHECK_INPUT.carName(TOO_LONG_NAME)).toThrow("[ERROR]");
  });

    test("변환된 자동차 목록이 빈 문자열 경우 error를 발생", async () => {
    // given
    const TOO_SHORT_NAME = ["aaaa", "bbb", "", "dddd"];
    
    // when
    const CHECK_INPUT = new CheckInput();

    // then
    expect(() => CHECK_INPUT.carName(TOO_SHORT_NAME)).toThrow("[ERROR]");
  });

  test("변환된 자동차 목록이 전부 5글자 이하일 경우 유효성 검사를 통과한다", () => {
    // given
    const VALID_CAR_LIST = ["aaaa", "bb", "c", "ddd", "eeeee"];

    // when
    const CHECK_INPUT = new CheckInput();

    // then
    expect(() => CHECK_INPUT.carName(VALID_CAR_LIST)).not.toThrow("[ERROR]")
  });

  test.each([NaN, 0, -1, 1.1])("Number로 변환된 시도 횟수가 유효하지 않을 경우 error를 발생", (input) => {
    // given
    const INVALID_ATTEMPT_INPUT = input;

    // when
    const CHECK_INPUT = new CheckInput();

    // then
    expect(() => CHECK_INPUT.attemptCount(INVALID_ATTEMPT_INPUT)).toThrow("[ERROR]")
  });

  test.each([1, 22, 3000, 999999999])("Number로 변횐된 시도 횟수가 유효할 경우 유효성 검사를 통과한다", (input) => {
    // given
    const VALID_ATTEMPT = input

    // when
    const CHECK_INPUT = new CheckInput();

    // then
    expect(() => CHECK_INPUT.attemptCount(VALID_ATTEMPT)).not.toThrow();
  })
});