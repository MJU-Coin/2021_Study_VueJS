# CRUD 구현
## 모든 게시물을 가져오는 Service 만들기

모든 게시물 데이터를 데이터베이스에서 가져오는 로직 구현

모든 게시물 데이터를 데이터베이스에서 가져오는 로직은 Service에서 구현해주면 된다. 바로 데이터베이스와 연동해서 하면 되지만, 처음부터 데이터베이스와 연결해서 하면 헷갈릴수 있기 때문에 우선 데이터를 로컬 메모리에 담아서 처리한다.   

데코레이터를 두고, 그 아래에 메소드를 만든다.

클라이언트에서 요청(여기서는 boards라는 경로)을 보내면 먼저 컨트롤러로 감.  
컨트롤러에서 알맞은 요청 경로에 라우팅해 해당 핸들러(getAllboard 메소드)로 가게 도와줌.  
그 후 요청을 처리하기 위해 서비스로 들어가, 요청에 맞는 로직을 서비스에서 처리해준 후(return this.boardsService.getAllBoards();) 컨트롤러에 리턴값([])을 보내준다.  
이후 컨트롤러에서는 요청을 처리하고 결과값을 리턴해주는 역할을 한다.  

#### Board Model 정의하기

CRUD 중 R은 생성했고, C.. create를 만들어야하는데, 이것을 생성하기 전에 Board Model을 정의할것이다.

Board Model이란 어떠한 게시물이 있으면, 게시물의 유니크한 아이디 값, 게시물의 이름, 선택값들.. 이런것들을 정의해주는것이다.

모델을 정의하기 위해서는 class를 이용하거나 interface를 이용하면 된다.
|이름|역할|
|--|--|
|interface|변수의 타입만을 체크한다|
|classes|변수의 타입도 체크하고 인스턴스 또한 생성할수 있다|

우선 board의 구조만 정의할것이기 때문에.. interface를 사용함.
```typescript
export interface Board {
    id: string; 
    title: string;
    description: string;
    status: ;
}
```
board status란 해당 게시물이 공개 게시물인지 비밀게시물인지 나눠주는것.
그리고 이 두가지 상태 이외의 것은 나오면 안되기 때문에 의도한대로 결과값이 나오게 하기 위해 타입스크립트의 기능인 enumeration을 사용한다.
```typescript
export enum BoardStatus { 
    PUBILC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}
```
타입을 정의해주는 것(: Board)은 선택사항이지만, 이렇게 함으로서 원하는 타입과 다른 코드를 사용할시 에러가 발생하도록 할수있다.

## 게시물을 생성해보자!
Service에서 먼저 게시물을 생성하는 로직을 처리함.
이후 Controller에서 Service를 불러와줌.

게시물의 ID..
ID는 모든 게시물에 유일해야한다. 만약 데이터베이스를 사용해, 데이터베이스에 데이터를 넣는 방식을 쓴다면 데이터베이스가 유니크한 값을 주지만, 현재는 데이터베이스를 사용하지 않고 있기 때문에, 우리가 임의로 유니크한 값을 부여해야한다.(uuid 모듈을 이용)

```
npm install uuid --save
```
```
import { v1 as uuid } from 'uuid';
```

### CRUD의 C(ontroller)
로직 부분을 처리했다면 이제 Request와 Response 부분 처리

클라이언트에서 보내온 값들을 핸들러에서 처리하는 방법

-> Express에서는 bodyParser 모듈을 이용해서 req.body 와 같은 형태로 클라이언트에서 보내온 값을 받아왔다.

-> Nest.js에서는 @Body body를 이용해서 가져온다. 이렇게 하면 모든 request에서 보내온 값을 가져올 수 있으며, 

```typescript
@Post()
createBoard(@Body() body) {
    console.log('body', body);
}
```
하나씩 특정해서 가져오려면 @Body('title') title<이름 혹은 @Body('description') description으로 가져올수있다.
```typescript
@Post()
    createBoard(
        //정보를 받아서 처리할때.. 그러한 정보를 받는 방법?
        @Body('title') title: string,
        @Body('description') description: string
    ): Board{
        return this.boardsService.createBoard(title, description)
    }
```

## DTO(Data Transfer Object)
계층간 데이터 교환을 위한 객체이다. DB에서 데이터를 얻어 Service나 Controlelr등으로 보낼 때 사용하는 객체를 말한다. 데이터가 네트워크를 통해 전송되는 방법을 interface나 class를 통해 정의하기도 한다.(class 추천)

왜 쓰는가  
->데이터 유효성을 체크하는데 효율적이라.
->더 안정적인 코드로 만들어줘서.

프로퍼티가 많아지면 관리가 힘들어지는데, DTO를 이용하면 훨씬 안정적이게 된다.

### 게시물 생성을 위한 DTO 생성해보기

DTO 폴더 생성 후 create-board.dto.ts 파일 생성.
클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에 파이프 같은 기능(이게 뭘까)을 이용할 때 더 유용하다. 그래서 클래스를 사용해서 DTO를 작성한다.

```
export class createBoardDto {
    title: string;
    description: string;
}
```
작성한 DTO를 controller와 service에 적용한다.

### ID로 특정 게시물 가져오기

서비스에서는 id를 가지고 찾는 역할, 컨트롤러는 서비스에서 리턴된 메소드를 가지고 요청된 경로에 맞게 클라이언트에 보내는 역할.