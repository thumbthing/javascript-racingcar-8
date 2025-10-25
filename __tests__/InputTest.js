import { Console } from "@woowacourse/mission-utils"
import { UserInput } from "../src/input/Input";

const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();

  Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

describe("입력", () => {
  test("자동차 이름을 입력 받고 입력 받은 값을 반환한다", async () => {
    // given
    const input = ["jackson,prince,acdc"];
    mockQuestions(input);

    // when
    const userInput = new UserInput();
    const carNamesInput = await userInput.getCarName();

    // then
    await expect(carNamesInput).toBe("jackson,prince,acdc");
  });

  test("시도 횟수를 입력 받고 입력 받은 값을 반환한다", async () => {
    // given
    const input = ['9'];
    mockQuestions(input);

    // when
    const userInput = new UserInput();
    const attemptsInput = await userInput.getRaceCount();

    // then
    await expect(attemptsInput).toBe('9');
  });
});