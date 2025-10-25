import { UserInput } from "./input/Input.js"
import { ParseInput } from "./parse/ParseInput.js";
import { Race } from "./race/Race.js";
import { CheckInput } from "./validate/CheckInput.js";

class App {

  // 필요 기능 인스턴스화
  initialize() {
    const userInput = new UserInput();
    const parser = new ParseInput();
    const checkValidate = new CheckInput();
    return {userInput, parser, checkValidate};
  }

  // 자동차 이름
  // 입력 -> 변환 -> 검증 -> 변환값 반환
  async getCarNameFromUserInput(userInput, parser, checkValidate) {
    const carInput = await userInput.getCarName();
    const carList = parser.parseCarList(carInput);
    checkValidate.carList(carList);
    return carList;
  }

  // 시도 횟수
  // 입력 -> 변환 -> 검증 -> 변환값 반환
  async getAttemptCountFromUserInput(userInput, parser, checkValidate) {
    const attemptInput = await userInput.getRaceCount();
    const attemptCount = parser.parseAttempts(attemptInput);
    checkValidate.attemptCount(attemptCount);
    return attemptCount;
  }

  // 레이스 실행
  startRace(carList, attemptCount) {
    const race = new Race(carList, attemptCount);
    race.run();
  }

  async run() {
    // 기능 인스턴스화
    const { userInput, parser, checkValidate } = this.initialize();

    const carList = await this.getCarNameFromUserInput(userInput, parser, checkValidate);
    const attemptCount = await this.getAttemptCountFromUserInput(userInput, parser, checkValidate);

    // 레이스 실행
    this.startRace(carList, attemptCount);
  }
}

export default App;
