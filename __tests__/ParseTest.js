import { ParseInput } from "../src/parse/ParseInput";

describe("변환", () => {
  test("문자열을 배열로 변환", () => {
    // given
    const USER_INPUT = 'jackson,acdc,coldPlay,1,true,익명';
    const PARSER = new ParseInput();

    // when
    const CAR_LIST = PARSER.getCarList(USER_INPUT);

    // then
    expect(CAR_LIST).toContain('jackson');
    expect(CAR_LIST).toContain('acdc');
    expect(CAR_LIST).toContain('coldPlay');
    expect(CAR_LIST).toContain('1');
    expect(CAR_LIST).toContain('true');
    expect(CAR_LIST).toContain('익명');
  });

  test("문자를 숫자로 변환",  () => {
    // given
    const ATTEMPT_INPUT = ['9', '10', '999', '한번', 'twice'];
    const PARSER = new ParseInput();

    // expect
    const PARSED_INPUT = [9, 10, 999, NaN, NaN];

    // then
    ATTEMPT_INPUT.forEach((input, index) => {
      expect(PARSER.getAttempts(input)).toBe(PARSED_INPUT[index]);
    }, PARSED_INPUT)
  });
});