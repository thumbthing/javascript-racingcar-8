# Test

## 테스트 목록

1. 입력
    - `getCarName()`
    - `getRaceCount()`
2. 변환
    - `getCarList()`
    - `getAttempts()`
3. 유효성
    - `carName()`

### Input

#### `getCarName()`

- 입력 값에 대한 반환

#### `getRaceCount()`

- 입력 값에 대한 반환

---

### Parse

#### `getCarList()`

- 입력 값을 변환된 배열로 반환

#### `getAttempts()`

- 입력 값을 숫자로 형변환

---

### Valid

#### `carName()`

- 빈값, 2개 미만의 자동차 이름에 대한 `Error throw`
- 중복된 자동차 이름에 대한 `Error throw`
- 요소 내에 5글자 이상의 자동차 이름에 대한 `Error throw`
- 요소 내에 빈 문자열의 자동차 이름에 대한 `Error throw`
- 요소 내의 글자의 길이가 1 이상, 5이하일 경우 유효성 통과

#### `attemptCount()`

- 변환 값의 유효하지 않은 값의 유효성 검사
    1. `NaN`
    2. 0 이하의 값
    3. 소수
- 변환 값의 유효한 값의 유효성 검사 통과

---

### Race

#### `getCondition()`

- 전진 조건에 해당하는 boolean 값 생성
    1. 4 이상일 경우 `true` 반환
    2. 3 미만일 경우 `false` 반환

#### `updateRecord()`

- 레이스 기록 초기화
- 레이스 기록 최신화
- 최신화된 레이스 기록 확인

#### `createRecordString()`

- 최신화된 레이스 기록의 문자열 생성
