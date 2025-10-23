import { UserInput } from "./input/Input.js"
import { ParseInput } from "./parse/ParseInput.js";
import { Race } from "./race/Race.js";
import { CheckInput } from "./validate/CheckInput.js";

class App {
  async run() {
    // 기능 인스턴스화
    const INPUT = new UserInput();
    const PARSE = new ParseInput();
    const CHECK_INPUT = new CheckInput();

    // 입력 -> 변환 -> 검증
    // 자동차 이름
    const CAR_INPUT = await INPUT.getCarName();
    const CAR_LIST = PARSE.getCarList(CAR_INPUT);
    CHECK_INPUT.carName(CAR_LIST);

    // 시도 횟수
    const ATTEMPT_INPUT = await INPUT.getRaceCount();
    const ATTEMPT_COUNT = PARSE.getAttempts(ATTEMPT_INPUT);
    CHECK_INPUT.attemptCount(ATTEMPT_COUNT);

    // 레이스 실행
    const RACE = new Race(CAR_LIST, ATTEMPT_COUNT);
    RACE.run();
  }
}

export default App;
