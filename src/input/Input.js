import { Console } from "@woowacourse/mission-utils";

export class UserInput {
  async getUserInput(notice) {
    const input = Console.readLineAsync(`${notice}\n`);
    return input;
  }

  async getCarName() {
    const notice = "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)";
    const input = await this.getUserInput(notice);
    return input;
  }

  async getRaceCount() {
    const notice = "시도할 횟수는 몇 회인가요?";
    const input = await this.getUserInput(notice);
    return input;
  }
}