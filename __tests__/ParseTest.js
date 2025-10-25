import { ParseInput } from "../src/parse/ParseInput";

describe("변환", () => {
  test("문자열을 배열로 변환", () => {
    // given
    const userInput = 'jackson,acdc,coldPlay,1,true,익명';
    const parser = new ParseInput();

    // when
    const carList = parser.parseCarList(userInput);

    // then
    expect(carList).toContain('jackson');
    expect(carList).toContain('acdc');
    expect(carList).toContain('coldPlay');
    expect(carList).toContain('1');
    expect(carList).toContain('true');
    expect(carList).toContain('익명');
  });

  test("문자를 숫자로 변환",  () => {
    // given
    const attemptInput = ['9', '10', '999', '한번', 'twice'];
    const parser = new ParseInput();

    // expect
    const parsedInput = [9, 10, 999, NaN, NaN];

    // then
    attemptInput.forEach((input, index) => {
      expect(parser.parseAttempts(input)).toBe(parsedInput[index]);
    }, parsedInput)
  });
});