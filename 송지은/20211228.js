//삼항연산자

//조건 ? 성립했을때 : 성립하지 않았을때;

num > 10 ? num = 11 : num = 9;

//forEach, map , filter, reduce

//forEach
//죄다 돌리기
const coronaCases = [
    {city:'1', case:1},
    {city:'2', case:2},
    {city:'3', case:3},
    {city:'4', case:4}
]

coronaCases.forEach(function(corona),indexs){
    console.log(indexs)
}

//map
//어떠한 배열을 가공하여 새로운 형태의 배열을 만들 때

const coronaCities = coronaCases.map((corona)=>{
    console.log(corona)
    return '$(corona.case)의 확진자 발생수는 ${corona.case}';
})

console.log(coronaCities)

//filter 배열에서 특정한 값을 가진 데이터를 필터링 할때
//어떤 조건을 만족하는 거만 뽑아내고싶을때.

const dangerousCity = coronaCases.filter(function(corona,index){
    return corona.case > 100;
})

console.log(dangerousCity)

//reduce
//어떤 배열의 값을 이용하여 특정 값을 도출하거나 재가공 할때
//어떤 값을 합치거나 재가공할때 많이 사용

const numbers = [10,123,22,33,44,55];
const totalNumbers = numbers.reduce((acc, cur)=>{
    console.log(acc,cur);
    return acc + cur;//리턴된 값은 acc에 담김
})

console.log(totalNumber)