# NestJS 기본 요소
### NestCLI로 생성한 프로젝트 기본구조
|이름|역할|
|--|--|
|eslintrc.js|개발자들이 특정한 규칙을 가지고 코드를 깔끔하게 짤수있게 도와주는 라이브러리 / 타입스크립트를 쓰는 가이드 라인 제시, 문법에 에러가 나면 알려주는 역할 등등(prettierrc와의 차이점)|
|prettierrc|주로 코드형식을 맞추는데 사용, 작음따옴표를 사용할지 큰따옴표를 사용할지, Indent값을 2로 줄지 4로 줄지 등등 에러찾는 것이 아닌 코드 포맷터 역할|
|nest-cli.json|nest 프로젝트를 위해 특정한 설정을 할 수 있는 json파일, 프로젝트 자체에 설정이 필요한것을 적음.|
|tsconfig.json|어떻게 타입스크립트를 컴파일 할지 설정|
|tsxonfig.build.json|tsconfig.json의 연장선상 파일이며, build를 할 때 필요한 설정들 'excludes'에서는 빌드할때 필요없는 파일들 명시|
|package.json|build: 운영환경을 위한 빌드,format: 린트에러가 났을지 수정, start: 앱시작|
|src 폴더|main.ts(앱을 생성하고 실행),app.module.ts(앱모듈을 정의?)|

### 기본 구조에서 살펴보는 Nest 로직 흐름

사용자가 Controller에 request를 보내면, Controller는 Service에서 처리를 한다음, 사용자에게 response를 보낸다.

main.ts
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

app.module.ts
```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

app.controller.ts
```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

app.service.ts
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

실행.. localhost:3000번 포트(클라이언트)가 요청을하면
어떻게 출력이 되냐 
main.ts에서 const app = await NestFactory.create(appModule); 
(이런식으로 app을 생성을 한것.)
appModule에서 controllers: [AppController],
provider: [AppService]라는게 등록이 되어있다.
등록이 된것들을 이용해 main.ts에서 실행을 한것이다.

클라이언트(브라우저), 서버가 nest.js 어플리케이션.

App.Controller에서 Get 메서드를 이용해 어플리케이션으로 요청을 보냄.

App.Service에서 getHello 실행..리턴 핼로 월드.

### NestJS 모듈이란?

AppModule(root Module)이 있으면 게시판에 해당하는 BoardModule과 게시판을 생성하는 사람의 인증을 담당하는 AuthModule이 내부에 있다.

모듈은 @Module() 데코레이터로 주석이 달린 클래스이다.@Module() 데코레이터는 Nest가 애플리케이션 구조를 구성하는데 사용하는 메타 데이터를 제공한다. 각 응용 프로그램에는 하나 이상의 모듈(root Module)이 있다. root Module은 모듈이 동작하는 시작점이다.

모듈은 밀접하게 관련된것끼리 뭉쳐져있다.
ex> 주문에 관련된 모듈은 order모듈안에..
같은 기능에 해당하는 것들은 하나의 모듈 폴더안에 넣어서 사용한다.
모듈은 기본적으로 싱글 톤이기 때문에 여러 모듈간에 쉽게 공급자의 동일한 인스턴스를 공유할 수 있다.

~~싱글톤 패턴~~

~~애플리케이션이 시작될 때 어떤 클래스가 최초 한번만 메모리를 할당하고(Static) 그 메모리에 인스턴스를 만들어 사용하는 디자인패턴.~~

~~생성자가 여러 차례 호출되더라도 실제로 생성되는 객체는 하나고 최초 생성 이후에 호출된 생성자는 최초에 생성한 객체를 반환한다. (자바에선 생성자를 private로 선언해서 생성 불가하게 하고 getInstance()로 받아쓰기도 함)~~

~~=> 싱글톤 패턴은 단 하나의 인스턴스를 생성해 사용하는 디자인 패턴이다.~~

~~(인스턴스가 필요 할 때 똑같은 인스턴스를 만들어 내는 것이 아니라, 동일(기존) 인스턴스를 사용하게함)~~

### Board Module 생성하기

Board Module 생성 명령어
```
nest g module boards
```
nest : usign nestcli
g : generate
module : schematic that I want to create
boards : name of the schematic

### NestJS Controllers란?

컨트롤러 
- 들어오는 요청을 처리하고 클라이언트에 응답을 반환한다.
- @Controller 데코레이터로 클래스를 데코레이션하여 정의된다.
```typescript
@Controller('/boards')
export class BoardsController {

}
```
- 데코레이터는 인자를 Controller에 의해 처리되는 '경로'로 받는다.

핸들러
- 핸들러는 @Get, @Post, @Delete 등과 같은 데코레이터로 장식된 컨트롤러 클래스 내의 단순한 메서드이다.

```typescript
@Controller('/boards')
export class BoardsController {

    @Get()
    getBoards(): string {
        return 'This action returns all boards';
    }

}
```

### Boards Controller 생성하기

```
nest g controller boards --no-spec
```
nest : using nest cli
g : generate
controller : controler schematic
boards : name of the schematic
--no-spec : 테스트를 위한 소스코드 생성 x

### NestJS Providers, Service란?

Providers
 - Nest의 기본 개념
    대부분의 기본 Nest 클래스는 서비스, 리포지토리, 팩토리, 헬퍼 등 프로바이더로 취급될수있다.
 - 프로바이더의 주요 아이디어는 종속성으로 **주입**할 수있다는 것이다.
 - 객체는 서로 다양한 관계를 만들수 있고, 객체의 인스턴스를 연결하는 기능은 대부분 Nest 런타임 시스템에 위임될수있다.

 컨트롤러에서는 여러가지(service)를 필요로 하는데, 이러한 것들은 컨트롤러 내부에서 구현이 불가능하기때문에, 컨트롤러에서 사용이 가능하게 객체에서 구현을 한다. 이렇게 사용이 가능하게 하는 것을 **주입**한다고 한다.

Service
- 서비스는 소프트웨어 개발내의 공통 개념이며, NestJS, Javascript에서만 쓰이는 개념이 아니다.
- @injectable 데코레이터로 감싸져서 모듈에 제공되며, 이 서비스 인스턴스는 애플리케이션 전체에서 사용될 수있다.
- 서비스는 컨트롤러에서 데이터의 유효성 체크를 하거나 데이터베이스에 아이템을 생성하는 등의 작업을 하는 부분을 처리한다.
 
board Service 생성하기
```
nest g service boards --no-spec
```
