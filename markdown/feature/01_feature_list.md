# 기능 목록

---

## `UserInput` 입력

### `getUserInput()` : 사용자 입력

1. 지정된 문구를 사용자에게 출력한다
2. 사용자에게 입력을 받는다
3. 입력된 값을 반환한다

### `getCarName()` : 자동차 이름 입력

1. 안내 문구를 지정한다
    - 안내 문구 : `경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)`
2. `getUserInput(안내문구)`로 안내-입력을 받는다
3. 입력 받은 값을 반환한다

### `getRaceCount()` : 시도 횟수 입력

1. 안내 문구를 지정한다
    - 안내 문구 : `시도할 횟수는 몇 회인가요?`
2. `getUserInput(안내문구)`로 안내-입력을 받는다
3. 입력 받은 값을 반환한다

---

## `ParseInput` : 변환

### `parseCarList(사용자 입력)` : 문자열 -> 배열 변환

1. 입력 받은 문자열을 배열로 변환
    - `split()` 메서드로 `,` 를 기준으로 분리
2. 생성된 배열을 반환

### `parseAttempts(사용자 입력)` : 문자열 -> 숫자 변환

1. 입력 받은 문자열을 숫자로 변환
    - `Number()`로 변환
2. 생성된 숫자를 반환

---

## `CheckInput` : 검증

### `INPUT_ERROR` : 전역 상수

- `에러의 종류 : 출력할 메시지` 형식의 데이터

### 초기 필드

- `errorStatus` 필드 초기화
  - `error 이름: false`로 이루어진 `Map`으로 초기화

### `initializeStatus()` : 필드 초기화

1. 기존의 `errorStatus` 필드의 key들을 배열로 복사하여 선언
2. 복사된 key들을 순회
    - `key: false`로 필드 값 초기화

### `updateErrorStatusByCarList()` : 자동차 입력값으로 필드 최신화

1. `lessThenTwoCar, inCorrectLength, notUniqueCarName`의 value를 최신화한다
    - 배열의 길이가 2 미만일 경우
    - 배열내 요소 중 하나라도 글자수 6 이상, 0 이하일 경우
    - 배열의 길이가 `new Set().size`로 중복 요소 제거된 길이보다 길 경우

### `carList(변환된 자동차 이름 배열)` : 자동차 입력값 검증

1. `errorStatus.keys()`로 key로 이루어진 배열을 복사하여 생성한다
2. `updateErrorStatusByCarList()`로 필드값을 최신화한다
3. `Array.some()`으로 복사된 배열을 순회한다
    - 최신화된 필드값중에 `true` 값이 존재하는지 확인한다
    - 필드의 value 값중에 `true`가 존재할 경우
    - 화면에 전역 상수로 선언한 `INPUT_ERROR`의 value 값을 출력한다
    - `intializeStatus()`로 최신화된 필드값을 초기화한다
    - `[ERROR]`를 throw 한다

### `attemptCount(변환된 시도 횟수)` : 시도 횟수 입력값 검증

1. `Number`로 변환된 입력값을 검사한다.
    - `NaN`인 경우
    - 0 보다 작은 경우
    - 소수인 경우
2. 검사한 3개의 항목중에 하나라도 해당할 경우 Error를 생성하고 `throw` 한다

---

## `Race` : 실행

### `constructor(자동차 목록, 실행 횟수)` : 초기화

1. `constructor`로 필드값 초기화
    - 자동차 이름, 실행 횟수 필드내에 초기화
    - 레이스 기록을 초기화한다
      - 지속적으로 최신화가 되기 때문에 `Object`보다는 `Map`으로 생성한다
      - `key: 자동차 이름, value: ""`으로 이루어진 데이터 구조를 생성한다

#### `getCondition()` : 전진 조건

1. `Random.pickNumberInRange()`로 0-9 사이의 값을 구한다
2. 생성된 값을 판단하여 `boolean` 값을 생성한다
    - 4 이상일 경우 `true`를 반환한다
    - 4 미만일 경우 `false`를 반환한다
3. 검사하여 생성된 값을 반환한다

#### `updateRecord()` : 레이스 기록 최신화

1. 초기화된 필드값 `carList`를 순회한다
    1. `getCondition()`으로 전진 여부의 `boolean`값을 얻는다
    2. `boolean` 값이 `true`일 경우 `raceRecord`를 최신화 한다
        - 해당하는 자동차의 기존 `value`를 가져와서 `"-"`를 추가한다
        - 추가된 `value`로 `raceRecord`를 최신화한다

#### `createRecordString()` : 결과 문자열 생성

1. `carList`필드로 `차 이름 : 진행결과` 형태로 변환한 배열을 생성
2. `join('\n')`으로 생성된 배열을 문자열로 변환
3. 생성된 문자열 뒤에 `\n`을 더한 최종 문자열을 생성
4. 생성된 문자열을 반환

#### `getWinnerPosition()` : 우승자 위치 확인

1. 레이스 기록에서 진행 기록으로 새로운 배열을 생성한다
    - `raceRecord.values()`로 `value (ex. ["---", "--"])`로 구성된 배열을 복사한다
    - `map()` 메서드로 요소들의 문자열 길이로 구성된 배열로 변환한다
2. 숫자로 구성된 생성된 배열에서 최대값을 구한다
3. 구해진 최대값을 반환한다

#### `getWinnerList()` : 우승자 명단 생성

1. 우승자 정보를 담을 배열을 선언한다
2. `carList`를 순회한다
    - 자동차 이름에 해당하는 레이스 기록의 `value`를 가져온다
    - 가져온 `value.length`가 가장 큰 정수에 해당하는지 확인한다.
    - 해당할 경우 자동차 이름을 우승자 배열에 추가한다
3. 우승자 명단을 반환한다

#### `getWinner()` : 우승자 판단

1. `getWinnerPosition()`으로 우승자 위치를 구한다
2. `getWinnerList()`로 우승자 명단을 구한다
3. 우승자 명단으로 문자열을 생성한다
    - `최종 우승자 : 우승자들` 형식의 문자열을 생성한다
    - 우승자들을 생성할 때 `Array.join(', ')`으로 변환해서 생성한다
4. 생성된 레이스 결과 문자열을 생성한다

#### `run()` : 시도할 횟수 만큼 반복

1. 레이스의 시작시 출력할 최초의 문자열`실행 결과`를 화면에 출력한다
2. `for`문으로 `시도할 횟수`의 필드값 만큼 반복한다
    - `updateRecord()`로 레이스 기록을 한번 최신화한다
    - `createRecordString()`으로 최신화된 레이스 기록의 문자열을 생성한다
    - 생성된 문자열을 화면에 출력한다
3. `getWinner()` 메서드로 레이스 결과를 화면에 출력한다

## `App` : 프로그램

구현한 기능들 모듈화

### `initialize()` : 필요 기능 인스턴스화

1. `UserInput()` 인스턴스화
2. `ParseInput()` 인스턴스화
3. `checkValidate()` 인스턴스화
4. 인스턴스화 한 기능들 반환

### `getCarNameFromUserInput()` : 자동차 이름 입력 모듈

1. `userInput.getCarName()`으로 자동차 이름 입력을 받는다
2. `parser.parseCarList(carInput)`로 입력값을 변환
3. `checkValidate.carList(carList)`로 변환된 값을 검증
4. 검증을 통과한 변환 값을 반환

### `getAttemptCountFromUserInput()` : 시도 횟수 입력 모듈

1. `userInput.getRaceCount()`으로 시도 횟수 입력을 받는다
2. `parser.parseAttempts(attemptInput)`로 입력값을 변환
3. `checkValidate.attemptCount(attemptCount)`로 변환된 값을 검증
4. 검증을 통과한 변환 값을 반환

### `startRace()` : 레이스 실행 모듈

1. 검증된 입력값으로 `Race` 클래스 인스턴스화
2. `Race.run()`으로 레이스 실행
