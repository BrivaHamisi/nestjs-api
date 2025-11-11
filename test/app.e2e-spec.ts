import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";

describe('App e2e', () => {

  let app: INestApplication;
  beforeAll(async () => {
    // Setup code before all tests run
    const moduleRef = await Test.createTestingModule({
      // module imports and providers
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true }),
    ); // if you have any global pipes
    await app.init();
  });

  afterAll( () => {
    app.close();
  });

  it.todo('Should Pass'); 
});