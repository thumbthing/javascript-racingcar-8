import { CheckInput } from "../src/validate/CheckInput";

describe("유효성", () => {
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
  })
});