head
- 외부파일 갖고와서 사용하는 부분

var

- 많이 사용하지 않는 것이 좋다.
- window에 등록이 되어서 글로벌 변수가 되어버린다.

let

- 어떤 병수가 빈번하게 변경이 되어야할때.

const

- 상수

let과 const는 블럭안에서만 호출 가능.
but 블럭 밖에서 선언했다면 안에서도 호출 가능.

substring(index)

- 인덱스를 기준으로 문자열 나누기

split(char)

- 문자를 기준으로 문자열 나누기

array

배열 내 특정 인덱스에 추가하기
특정 인덱스에 넣기

- array[3] = "dog"

무조건 마지막에 넣기

- animals.push("tiger")

첫번째에 넣기

- animals.unshift("dog")

마지막부터 없애기

- animals.pop

배열이 맞는지 확인

- Array.isArray(animals)

특정 값의 인덱스 확인

- animals.indexOf("monkey")
- animals.splice(0, 2)
(0번째부터 2개를 뺀다.(배열 자체를 바꿈))
- const slicedAnimal = animals.slice(0,2)
(0번째부터 2번째까지의 값을 반환)

object

key와 value값이 쌍을 이루고 있는 데이터 형태

JSON
const monkeyJSON = JSON.stringify(monkey);
const parsedJSON = JSON.parse(monkeyJSON)

화살표 함수

//const showPrice = function(){}
const showPrice = (i) => {
    console.log(i+loyalty)
 }

showPrice(item1)

