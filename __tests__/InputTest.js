import { Console } from "@woowacourse/mission-utils"
import { CarInput } from "../src/input/Input";

const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();

  Console.readLineAsync.mockImplementation(() => {
    const INPUT = inputs.shift();
    return Promise.resolve(INPUT);
  });
};

describe("입력", () => {
  test("자동차 이름을 입력 받고 입력 받은 값을 반환한다", async () => {
    // given
    const INPUT = ["jackson,prince,acdc"];
    mockQuestions(INPUT);

    // when
    const CAR_INPUT = new CarInput();
    const CAR_NAME = await CAR_INPUT.getName();

    // then
    await expect(CAR_NAME).toBe("jackson,prince,acdc");
  });
});