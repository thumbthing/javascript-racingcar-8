import { Console } from "@woowacourse/mission-utils";

export class UserInput {
  async getInput(notice) {
    const INPUT = Console.readLineAsync(`${notice}\n`);
    return INPUT;
  }

  async getCarName() {
    const NOTICE = "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)";
    const INPUT = await this.getInput(NOTICE);
    return INPUT;
  }

  async getRaceCount() {
    const NOTICE = "시도할 횟수는 몇 회인가요?";
    const INPUT = await this.getInput(NOTICE);
    return INPUT;
  }
}