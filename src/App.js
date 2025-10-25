import { UserInput } from "./input/Input.js"
import { ParseInput } from "./parse/ParseInput.js";
import { Race } from "./race/Race.js";
import { CheckInput } from "./validate/CheckInput.js";

class App {
  async run() {
    // 기능 인스턴스화
    const userInput = new UserInput();
    const parser = new ParseInput();
    const checkValidate = new CheckInput();

    // 입력 -> 변환 -> 검증
    // 자동차 이름
    const carInput = await userInput.getCarName();
    const carList = parser.parseCarList(carInput);
    checkValidate.carList(carList);

    // 시도 횟수
    const attemptInput = await userInput.getRaceCount();
    const attemptCount = parser.parseAttempts(attemptInput);
    checkValidate.attemptCount(attemptCount);

    // 레이스 실행
    const race = new Race(carList, attemptCount);
    race.run();
  }
}

export default App;
