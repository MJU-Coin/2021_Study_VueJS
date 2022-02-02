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

###기본 구조에서 살펴보는 Nest 로직 흐름
사용자가 Controller에 request를 보내면, Controller는 Service에서 처리를 한다음, 사용자에게 response를 보낸다.

### Nest모듈이란?

#### Nest JS를 사용해서 만드는 앱 구조

App Module안에 BoardModule과 AuthModule이 있으면 각 모듈안에 Controller Entitly Service등이 있다.


