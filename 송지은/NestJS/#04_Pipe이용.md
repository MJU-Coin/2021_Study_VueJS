# Pipe 이용

### Pipe란?
- @ injsctable() 이란 데코레이터로 주석이 달린 클레스 이다.
- data transformation과 data validation을 위해 사용된다.
- 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동한다.
- Nest는 메소드가 호출되기 직전에 파이프를 삽입하고 파이프는 메소드로 향하는 인수를 수신한다.

파이프에서 요청에서 오는 인수들에 대해 data transformation(입력데이터를 원하는 형식으로 변환)과 data validation(걸러주는 역할 수행)을 실행한다.

### PIPE 사용방법

#### 1. Handler-level Pipe
핸들러 레벨에서 @UserPipes() 데코레이터를 이용해 사용할수 있다.
모든 파라미터에 적용이 된다.

```typescript
@Post()
@UsePipes(pipe)//라우트에 있는 파라미터에만 파이프 적용..
createBoard(
    @Body('title') title,
    @Body('description') description
){
}
```
#### 2. Parameter-level Pipe
특정 파라미터에만 적용
```typescript
@Post()
createBoard(
    @Body('title',ParameterPipe) title,
    @Body('description') description
){}
```

#### 3. Global-level Pipe
어플리케이션 레벨의 파이프.
클라이언트에서 들어오는 모든 욕청에 적용이 된다.
main.ts에서 적용시킴.
```typescript
async function botstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(GlobalPipes);
    await app.listen(3000);
}
bootstrap();
```

### PIPE를 이용한 유효성 체크

```
npm install class-validator class-transformer --save
```

