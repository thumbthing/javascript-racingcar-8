import { Console } from "@woowacourse/mission-utils"
import { UserInput } from "../src/input/Input";

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
    const CAR_INPUT = new UserInput();
    const CAR_NAMES = await CAR_INPUT.getCarName();

    // then
    await expect(CAR_NAMES).toBe("jackson,prince,acdc");
  });
});