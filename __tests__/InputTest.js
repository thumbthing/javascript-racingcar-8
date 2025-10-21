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
    const USER_INPUT = new UserInput();
    const CAR_NAMES = await USER_INPUT.getCarName();

    // then
    await expect(CAR_NAMES).toBe("jackson,prince,acdc");
  });

  test("시도 횟수를 입력 받고 입력 받은 값을 반환한다", async () => {
    // given
    const INPUT = ['9'];
    mockQuestions(INPUT);

    // when
    const USER_INPUT = new UserInput();
    const ATTEMPTS = await USER_INPUT.getRaceCount();

    // then
    await expect(ATTEMPTS).toBe('9');
  });
});