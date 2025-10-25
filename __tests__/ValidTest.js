import { CheckInput } from "../src/validate/CheckInput";

describe("유효성", () => {
  test.each([
    [""],
    ["one"],
  ])("빈값, 2개 미만의 자동차 이름 입력시 error 발생", (...input) => {
    // given
    const tooLessCar = input;

    // when
    const checkValidate = new CheckInput();

    // then
    expect(() => checkValidate.carList(tooLessCar)).toThrow("[ERROR]");
  });

  test.each([
    ["aaa", "bb", "c"],
    ["ccccc", "ddddd", "eeeee", "fffff", "ggggg"]
  ])("2개 이상의 자동차 이름 입력시 유효성 검사 통과", (...input) => {
    // given
    const validCarList = input;

    // when
    const checkValidate = new CheckInput();

    // then
    expect(() => checkValidate.carList(validCarList)).not.toThrow("[ERROR[");
  });

  test.each([
    ["aaa", "aaa"],
    ["a", "b", "c", "d", "b"]
  ])("중복된 자동차 이름 존재 시 error 발생", (...input) => {
    // given
    const duplicateCarName = input;

    // when
    const checkValidate = new CheckInput();

    // then
    expect(() => checkValidate.carList(duplicateCarName)).toThrow("[ERROR]");
  })

  test("변환된 자동차 목록이 5글자를 초과할 경우 error를 발생", async () => {
    // given
    const tooLongName = ["aaaa", "bbb", "c", "dddddd"];
    
    // when
    const checkValidate = new CheckInput();

    // then
    expect(() => checkValidate.carList(tooLongName)).toThrow("[ERROR]");
  });

    test("변환된 자동차 목록이 빈 문자열 경우 error를 발생", async () => {
    // given
    const tooShortName = ["aaaa", "bbb", "", "dddd"];
    
    // when
    const checkValidate = new CheckInput();

    // then
    expect(() => checkValidate.carList(tooShortName)).toThrow("[ERROR]");
  });

  test("변환된 자동차 목록이 전부 5글자 이하일 경우 유효성 검사를 통과한다", () => {
    // given
    const validCarList = ["aaaa", "bb", "c", "ddd", "eeeee"];

    // when
    const checkValidate = new CheckInput();

    // then
    expect(() => checkValidate.carList(validCarList)).not.toThrow("[ERROR]")
  });

  test.each([NaN, 0, -1, 1.1])("Number로 변환된 시도 횟수가 유효하지 않을 경우 error를 발생", (input) => {
    // given
    const inValiedParsedAttemptInput = input;

    // when
    const checkValidate = new CheckInput();

    // then
    expect(() => checkValidate.attemptCount(inValiedParsedAttemptInput)).toThrow("[ERROR]")
  });

  test.each([1, 22, 3000, 999999999])("Number로 변횐된 시도 횟수가 유효할 경우 유효성 검사를 통과한다", (input) => {
    // given
    const validParsedAttemptInput = input

    // when
    const checkValidate = new CheckInput();

    // then
    expect(() => checkValidate.attemptCount(validParsedAttemptInput)).not.toThrow();
  })
});