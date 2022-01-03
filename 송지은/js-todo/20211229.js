
객체지향 프로그래밍
많은 언어에서 그 우수성이 입증이 된 방식.
자바스크립트는 멀티패러다임 언어.(함수형 코드, 객체지향 코드 둘다 가능)

new키워드를 통해 instance화 해야함. 

ex)
function Song(singer, title, release){
    this.singer = singer;
    this.tile = title;
    this.release = release;

    console.log(this);
}

const song1 = new Song();

객체지향적인 틀만 만들어서 값만 그대로 사용하겠다.


작동하는 방법은 완전히 똑같음
ex)
class Song{
    constructor(singer,title,release){
        this.singer = singer;
        this.tile = this.title;
        this.release = new Date(release)
    }

    getReleaseDay(){
        return this.release.getDay();
    }
}

DOM
Document Object Model
화면에서 보이는 문자라던지 어떤 내용을 오브젝트의 형태로 제어를 하고 다양한 인터렉티브한
효과를 입힐수있는 것

돔을 사용하면 버튼을 눌렀을때 화면이 슬라이딩이 된다던지 통신을 한다던지 여러 기능을 사용가능

주의> html은 순차적으로 실행이 된다.

